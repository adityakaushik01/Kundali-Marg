import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import app from "./app.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('=================================');
  console.log('Kundali Marg Server Started!');
  console.log(`Running on   : http://localhost:${PORT}`);
  console.log(`Environment  : ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check : http://localhost:${PORT}/api/health`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`Sample       : http://localhost:${PORT}/api/sample`);
  console.log('=================================');
});

// ── Graceful Shutdown ─────────────────────────────────────────

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});