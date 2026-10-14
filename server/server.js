import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import converterRoutes from "./routes/converterRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const app = express();
const port = Number(process.env.PORT) || 5000;
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error(
    "JWT_SECRET must be set to a random secret with at least 32 characters.",
  );
  process.exit(1);
}
app.disable("x-powered-by");
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { message: "Too many requests. Please try again later." },
  }),
);
app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { message: "Too many authentication attempts. Try again later." },
  }),
);
app.get("/api/health", (req, res) =>
  res.json({ status: "ok", service: "CodeMorph API" }),
);
app.use("/api/auth", authRoutes);
app.use("/api/conversions", converterRoutes);
app.use(notFound);
app.use(errorHandler);
connectDB()
  .then(() =>
    app.listen(port, () =>
      console.log(`API running at http://localhost:${port}`),
    ),
  )
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
