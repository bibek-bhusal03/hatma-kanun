// src/middleware/rateLimiter.ts
import rateLimit from "express-rate-limit";

// General limiter for auth routes (e.g., login/register)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many login/register attempts, try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const applicationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many applications from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const pdfLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: { message: "Too many PDF requests, slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});
