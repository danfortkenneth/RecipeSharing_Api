const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPass });
    await user.save();

    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;