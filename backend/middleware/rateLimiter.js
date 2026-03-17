import rateLimit from "express-rate-limit";

const kundliLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again after 15 minutes.' }
});

export default kundliLimiter;