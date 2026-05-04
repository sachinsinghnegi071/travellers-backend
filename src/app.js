import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import tripRequestRoutes from "./routes/tripRequestRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Backend is running",
    success: true,
  });
});

app.use("/api/trip-requests", tripRequestRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    success: false,
  });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message || "Something went wrong",
    success: false,
  });
});

export default app;
