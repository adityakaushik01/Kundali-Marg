const notFound = (req, res) => {
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
};

export default notFound;