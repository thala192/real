const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB
const connectDB = require("./db");
connectDB();

// Middleware
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());
app.use(morgan("dev"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Real Estate Backend API is running");
});

// API routes
app.use("/api/users", require("./controllers/newuser"));
app.use("/api/users", require("./controllers/login"));
app.use("/api/admin", require("./controllers/adminlogin"));
app.use("/api/admin", require("./controllers/adminsignup"));
app.use("/api", require("./controllers/propertyRoutes"));
app.use("/api", require("./controllers/propertyImageRoutes"));
app.use("/api/testimonials", require("./controllers/testimonialRoutes"));
app.use("/api", require("./controllers/emailVerification"));
app.use("/api", require("./controllers/Appointment"));
app.use("/api/staff", require("./controllers/staffControllers"));
app.use("/api/user-update", require("./controllers/userProfileRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);

});
