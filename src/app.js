import 'dotenv/config';
import cors from "cors";
import express from "express";
import tripRequestRoutes from "./routes/tripRequestRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow any origin in dev or if origin is not present
      if (!origin || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(null, process.env.CLIENT_URL || "http://localhost:5173");
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Backend is running",
    success: true,
  });
});

app.use("/api/trip-requests", tripRequestRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/payment", bookingRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/reviews", reviewRoutes);

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
