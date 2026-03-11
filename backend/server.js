import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { calculateAccurateKundali } from './kundaliCalculator.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Rate Limiter ──────────────────────────────────────────────────────────────
const kundliLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again after 15 minutes.' }
});

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ── Core Middleware ───────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Request Logger ────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ── Rate limiter applied before route ─────────────────────────────────────────
app.use('/api/kundli', kundliLimiter);

// ── GET / ─────────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: "🔮 Kundali Marg API is running",
    status: "online",
    frontend: "https://kundali-marg.vercel.app"
  });
});

// ── POST /api/kundli ──────────────────────────────────────────────────────────
app.post('/api/kundli', async (req, res) => {
  try {
    const { datetime, latitude, longitude, name, timezone, timezoneOffset } = req.body;

    console.log('Kundali Request Received:', {
      datetime, latitude, longitude,
      name: name || 'Anonymous'
    });

    if (!datetime) {
      return res.status(400).json({
        error: 'Missing datetime parameter',
        message: 'Please provide birth date and time'
      });
    }

    if (!latitude || !longitude) {
      return res.status(400).json({
        error: 'Missing location parameters',
        message: 'Please provide latitude and longitude'
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        error: 'Invalid coordinates',
        message: 'Latitude and longitude must be valid numbers'
      });
    }

    if (lat < -90 || lat > 90) {
      return res.status(400).json({
        error: 'Invalid latitude',
        message: 'Latitude must be between -90 and 90'
      });
    }

    if (lng < -180 || lng > 180) {
      return res.status(400).json({
        error: 'Invalid longitude',
        message: 'Longitude must be between -180 and 180'
      });
    }

    if (name && name.length > 100) {
      return res.status(400).json({
        error: 'Invalid name',
        message: 'Name must be under 100 characters'
      });
    }

    const birthDate = new Date(datetime);
    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({
        error: 'Invalid datetime',
        message: 'Please provide a valid date and time'
      });
    }

    if (birthDate > new Date()) {
      return res.status(400).json({
        error: 'Future date not allowed',
        message: 'Birth date cannot be in the future'
      });
    }

    if (birthDate < new Date('1900-01-01')) {
      return res.status(400).json({
        error: 'Date too far in the past',
        message: 'Birth date must be after January 1, 1900'
      });
    }

    console.log('Validation passed, calculating kundali...');

    const kundaliData = await calculateAccurateKundali({
      datetime: birthDate,
      latitude: lat,
      longitude: lng,
      name: (name || '').trim() || 'User'
    });

    console.log('Kundali calculation completed successfully');

    kundaliData.request_info = {
  processed_at: new Date().toISOString(),
  birth_datetime_utc: birthDate.toISOString(),
  timezone,
  timezone_offset: timezoneOffset,
  coordinates: { latitude: lat, longitude: lng }
};

    res.json(kundaliData);

  } catch (error) {
    console.error('Error generating kundali:', error);
    res.status(500).json({
      error: 'Kundali calculation failed',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
  }
});

// ── GET /api/health ───────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    libraries: {
      swisseph: 'latest',
      express: '4.18.2',
      cors: '2.8.5',
      'express-rate-limit': '8.x',
      dotenv: 'latest'
    },
    endpoints: {
      kundli: '/api/kundli (POST)',
      health: '/api/health (GET)',
      test:   '/api/test (GET)',
      sample: '/api/sample (GET)'
    }
  });
});

// ── GET /api/test ─────────────────────────────────────────────────────────────
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Server is working correctly',
    usage_example: {
      method: 'POST',
      url: '/api/kundli',
      headers: { 'Content-Type': 'application/json' },
      body: {
        datetime: '2000-04-06T07:24:00.000Z',
        latitude: 28.6139,
        longitude: 77.2090,
        name: 'Test User'
      }
    }
  });
});

// ── GET /api/sample ───────────────────────────────────────────────────────────
app.get('/api/sample', async (req, res) => {
  try {
    const kundaliData = await calculateAccurateKundali({
      datetime: new Date('1990-06-15T14:30:00.000Z'),
      latitude: 28.6139,
      longitude: 77.2090,
      name: 'Sample User'
    });
    res.json(kundaliData);
  } catch (error) {
    console.error('Error generating sample kundali:', error);
    res.status(500).json({
      error: 'Sample calculation failed',
      message: error.message
    });
  }
});

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `Route ${req.method} ${req.originalUrl} does not exist`,
    available_endpoints: [
      'POST /api/kundli',
      'GET  /api/health',
      'GET  /api/test',
      'GET  /api/sample'
    ]
  });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  });
});

// ── Graceful Shutdown ─────────────────────────────────────────────────────────
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('=================================');
  console.log('Kundali Marg Server Started!');
  console.log(`Running on   : http://localhost:${PORT}`);
  console.log(`Environment  : ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check : http://localhost:${PORT}/api/health`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`Sample       : http://localhost:${PORT}/api/sample`);
  console.log('=================================');
});