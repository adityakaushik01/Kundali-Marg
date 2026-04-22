export const test = (req, res) => {
  res.json({
    message: 'Server is working correctly',
    usage_example: {
      method: 'POST',
      url: '/api/kundali',
      headers: { 'Content-Type': 'application/json' },
      body: {
        datetime: '2000-04-06T07:24:00.000Z',
        latitude: 28.6139,
        longitude: 77.2090,
        name: 'Test User'
      }
    }
  });
};