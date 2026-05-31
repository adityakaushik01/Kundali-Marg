export const healthCheck = (req, res) => {
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
        kundali: '/api/kundali (POST)',
        health: '/api/health (GET)',
        test:   '/api/test (GET)',
        sample: '/api/sample (GET)'
      }
    });
};