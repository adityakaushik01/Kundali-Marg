import express from 'express';
import cors from 'cors';
import { calculateAccurateKundali } from './kundaliCalculator.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // React dev servers
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Generate Accurate Kundali endpoint
app.post('/api/kundli', async (req, res) => {
  try {
    const { datetime, latitude, longitude, name } = req.body;

    console.log('📥 Kundali Request Received:', {
      datetime,
      latitude,
      longitude,
      name: name || 'Anonymous'
    });

    // Validate required parameters
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

    // Validate parameter types
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
        message: 'Latitude must be between -90 and 90 degrees'
      });
    }

    if (lng < -180 || lng > 180) {
      return res.status(400).json({
        error: 'Invalid longitude',
        message: 'Longitude must be between -180 and 180 degrees'
      });
    }

    // Validate datetime
    const birthDate = new Date(datetime);
    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({
        error: 'Invalid datetime',
        message: 'Please provide a valid date and time'
      });
    }

    // Check if date is in the future
    if (birthDate > new Date()) {
      return res.status(400).json({
        error: 'Future date not allowed',
        message: 'Birth date cannot be in the future'
      });
    }

    // Check if date is too far in the past (optional validation)
    const minDate = new Date('1900-01-01');
    if (birthDate < minDate) {
      return res.status(400).json({
        error: 'Date too far in the past',
        message: 'Birth date must be after January 1, 1900'
      });
    }

    console.log('✅ Validation passed, calculating kundali...');

    // Calculate accurate kundali using astronomical libraries
    const kundaliData = await calculateAccurateKundali({
      datetime: birthDate,
      latitude: lat,
      longitude: lng,
      name: (name || '').trim() || 'User'
    });

    console.log('🎯 Kundali calculation completed successfully');

    // Add request metadata to response
    kundaliData.request_info = {
      processed_at: new Date().toISOString(),
      coordinates: { latitude: lat, longitude: lng },
      birth_datetime: birthDate.toISOString(),
      calculation_method: 'Astronomia + Vedic Astrology'
    };

    res.json(kundaliData);

  } catch (error) {
    console.error('❌ Error generating kundli:', error);
    
    // Send detailed error information
    res.status(500).json({
      error: 'Kundali calculation failed',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory_usage: process.memoryUsage(),
    node_version: process.version,
    platform: process.platform,
    libraries: {
      astronomia: '3.1.1',
      express: '4.18.2',
      cors: '2.8.5'
    },
    endpoints: {
      kundli: '/api/kundli (POST)',
      health: '/api/health (GET)',
      test: '/api/test (GET)'
    }
  };

  console.log('💓 Health check requested');
  res.json(healthData);
});

// Test endpoint for debugging
app.get('/api/test', (req, res) => {
  const testData = {
    message: '🧪 Server is working correctly',
    test_calculation: true,
    sample_data: {
      datetime: '2024-01-15T10:30:00.000Z',
      latitude: 28.6139, // Delhi
      longitude: 77.2090,
      name: 'Test User'
    },
    usage_example: {
      method: 'POST',
      url: '/api/kundli',
      headers: { 'Content-Type': 'application/json' },
      body: {
        datetime: '2024-01-15T10:30:00.000Z',
        latitude: 28.6139,
        longitude: 77.2090,
        name: 'John Doe'
      }
    }
  };

  console.log('🧪 Test endpoint accessed');
  res.json(testData);
});

// Sample kundali endpoint for testing
app.get('/api/sample', async (req, res) => {
  try {
    console.log('📋 Sample kundali requested');
    
    const sampleData = {
      datetime: new Date('1990-06-15T14:30:00.000Z'),
      latitude: 28.6139,
      longitude: 77.2090,
      name: 'Sample User'
    };

    const kundaliData = await calculateAccurateKundali(sampleData);
    res.json(kundaliData);

  } catch (error) {
    console.error('❌ Error generating sample kundali:', error);
    res.status(500).json({
      error: 'Sample calculation failed',
      message: error.message
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `Route ${req.method} ${req.originalUrl} does not exist`,
    available_endpoints: [
      'POST /api/kundli',
      'GET /api/health',
      'GET /api/test',
      'GET /api/sample'
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('💥 Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📴 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 =================================');
  console.log(`🌟 Kundali Server Started Successfully!`);
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`💻 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📋 Sample kundali: http://localhost:${PORT}/api/sample`);
  console.log('🚀 =================================');
});