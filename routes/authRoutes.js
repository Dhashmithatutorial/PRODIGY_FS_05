const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");


// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

const User = require("../models/User");

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;
