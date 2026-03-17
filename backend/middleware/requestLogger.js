const requestLogger = (req, res, next) => {
  console.log(`Request: ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};

export default requestLogger;