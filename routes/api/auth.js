const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const config = require("config");
const jwtSecret = config.get("jwtSecret");

const User = require("../../models/User");

/**
 * @path : "/"
 * @req : get
 * @isAuth : true
 * @purpose :  Get user by ID
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/"
 * @req : post
 * @isAuth : true
 * @purpose :  Create new user by HR member
 */
router.post("/", [
  check("email", "Please include a valid email").isEmail(),
  check("email", "Email is required").not().isEmpty(),
  check("password", "Password is required").exists()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials." }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Bad Password" }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    // TODO: Set lower size of expiration token
    jwt.sign(payload, jwtSecret, { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
