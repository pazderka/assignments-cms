const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const config = require("config");
const jwtSecret = config.get("jwtSecret");

const User = require("../../models/User");


router.post("/", [
  check("firstName", "First name is required.").not().isEmpty(),
  check("lastName", "Last name is required.").not().isEmpty(),
  check("email", "Please include a valid email.").isEmail(),
  check("password", "Please enter a password with more than 6 characters").isLength({
    min: 6
  })
], async (req, res) => {
  const errors = validationResult(req);

  // Check for errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if user exists
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    // User exists
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists." }] });
    }


    // User doesnt exist - we can create him

    // Secure pw first - generate salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const created = await User.create({ firstName, lastName, email, password: hashedPassword });

    const payload = {
      user: {
        id: created.id // this is given to cause its auto-generated in db (callback)
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;

      res.json({ token });
    });
  } catch (error) {
    res.status(500).json(error);
  }

});

module.exports = router;