import express from "express";
import corsMiddleware from "./middleware/corsConfig.js";
import rateLimiter from "./middleware/rateLimiter.js";
import requestLogger from "./middleware/requestLogger.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.js";
import kundaliRoutes from "./routes/kundaliRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// ── CORS ─────────────────────────────────────
app.use(corsMiddleware);

// ── Core Middleware ─────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Request Logger ──────────────────────────
app.use(requestLogger);

// ── Rate Limiters (BEFORE ROUTES) ───────────
app.use("/api/auth", rateLimiter);
app.use("/api/kundli", rateLimiter);

// ── Routes ─────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api", kundaliRoutes);
app.use("/api/kundali", kundaliRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);

// ── 404 Handler ─────────────────────────────
app.use(notFound);

// ── Global Error Handler ────────────────────
app.use(errorHandler);

export default app;