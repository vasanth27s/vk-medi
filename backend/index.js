require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to VK Medi ");
});

// API Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// MongoDB Connection
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  console.error("❌ MONGODB_URL is missing in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  });

// Handle 404 Errors
app.use((req, res, next) => {
  next(new ApiError(404, "Not Found"));
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
