const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to BabySteps API");
});

app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

if (!process.env.MONGODB_URL) {
  console.error("❌ MONGODB_URL is missing in .env file");
  process.exit(1); 
}

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); 
  });

app.use((req, res, next) => {
  next(new ApiError(404, "Not Found"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
