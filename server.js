const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/posts", postRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
    family:4
})
.then(() => console.log("MongoDB Connected Successfully ✅"))
.catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const path = require("path");

// Serve static frontend folder
app.use(express.static(path.join(__dirname, "frontend")));

// Default route → open register page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "register.html"));
});