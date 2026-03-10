import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { calculateAccurateKundali } from './kundaliCalculator.js';

const app = express();
const PORT = 5000;

// ── Rate Limiter (defined first) ──────────────────────────────────────────────
const kundliLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,                   // max 20 requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again after 15 minutes.' }
});

// ── Core Middleware ───────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Request Logger ────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ── Apply rate limiter BEFORE the route ───────────────────────────────────────
app.use('/api/kundli', kundliLimiter);

// ── POST /api/kundli ──────────────────────────────────────────────────────────
app.post('/api/kundli', async (req, res) => {
  try {
    const { datetime, latitude, longitude, name } = req.body;

    console.log('📥 Kundali Request Received:', {
      datetime,
      latitude,
      longitude,
      name: name || 'Anonymous'
    });

    // Validate datetime
    if (!datetime) {
      return res.status(400).json({
        error: 'Missing datetime parameter',
        message: 'Please provide birth date and time'
      });
    }

    // Validate coordinates presence
    if (!latitude || !longitude) {
      return res.status(400).json({
        error: 'Missing location parameters',
        message: 'Please provide latitude and longitude'
      });
    }

    // Validate coordinate types
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

    // Validate name length
    if (name && name.length > 100) {
      return res.status(400).json({
        error: 'Invalid name',
        message: 'Name must be under 100 characters'
      });
    }

    // Validate datetime value
    const birthDate = new Date(datetime);
    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({
        error: 'Invalid datetime',
        message: 'Please provide a valid date and time'
      });
    }

    // No future dates
    if (birthDate > new Date()) {
      return res.status(400).json({
        error: 'Future date not allowed',
        message: 'Birth date cannot be in the future'
      });
    }

    // No dates before 1900
    if (birthDate < new Date('1900-01-01')) {
      return res.status(400).json({
        error: 'Date too far in the past',
        message: 'Birth date must be after January 1, 1900'
      });
    }

    console.log('✅ Validation passed, calculating kundali...');

    const kundaliData = await calculateAccurateKundali({
      datetime: birthDate,
      latitude: lat,
      longitude: lng,
      name: (name || '').trim() || 'User'
    });

    console.log('🎯 Kundali calculation completed successfully');

    kundaliData.request_info = {
      processed_at: new Date().toISOString(),
      coordinates: { latitude: lat, longitude: lng },
      birth_datetime: birthDate.toISOString(),
      calculation_method: 'Swiss Ephemeris + Vedic Astrology'
    };

    console.log('📤 Kundali Response Sent:', kundaliData);

    res.json(kundaliData);

  } catch (error) {
    console.error('❌ Error generating kundli:', error);
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
  console.log('💓 Health check requested');
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory_usage: process.memoryUsage(),
    node_version: process.version,
    platform: process.platform,
    environment: process.env.NODE_ENV || 'development',
    libraries: {
      astronomia: '3.1.1',
      express: '4.18.2',
      cors: '2.8.5',
      'express-rate-limit': '7.x'
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
  console.log('🧪 Test endpoint accessed');
  res.json({
    message: '🧪 Server is working correctly',
    usage_example: {
      method: 'POST',
      url: '/api/kundli',
      headers: { 'Content-Type': 'application/json' },
      body: {
        datetime: '2000-04-06T07:24:00.000Z',
        latitude: 28.6139,
        longitude: 77.2090,
        name: 'Aditya Kaushik'
      }
    }
  });
});

// ── GET /api/sample ───────────────────────────────────────────────────────────
app.get('/api/sample', async (req, res) => {
  try {
    console.log('📋 Sample kundali requested');
    const kundaliData = await calculateAccurateKundali({
      datetime: new Date('1990-06-15T14:30:00.000Z'),
      latitude: 28.6139,
      longitude: 77.2090,
      name: 'Sample User'
    });
    res.json(kundaliData);
  } catch (error) {
    console.error('❌ Error generating sample kundali:', error);
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
  console.error('💥 Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  });
});

// ── Graceful Shutdown ─────────────────────────────────────────────────────────
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📴 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('🚀 =================================');
  console.log(`🌟 Kundali Server Started Successfully!`);
  console.log(`📡 Running on   : http://localhost:${PORT}`);
  console.log(`💻 Environment  : ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Health check : http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📋 Sample       : http://localhost:${PORT}/api/sample`);
  console.log('🚀 =================================');
});