const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const config = require("config");
const jwtSecret = config.get("jwtSecret");

const User = require("../../models/User");
const Project = require("../../models/Project");

const auth = require("../../middleware/auth");


router.get("/", auth, async (req, res) => {
  const all = await User.findAll();
  res.status(200).json(all);
});


router.delete("/:UserId", auth, async (req, res) => {
  const id = req.params.UserId;
  await User.destroy({
    where: {
      id
    }
  });

  res.status(200).json({
    msg: "User deleted"
  });


});

router.post("/permission", auth, async (req, res) => {
  const UserId = req.user.id;

  const user = await User.findByPk(UserId);

  res.status(200).json(user.permission);
});

router.put("/delegate", auth, async (req, res) => {
  const projectId = req.body.projectId;
  const delegatedTo = req.body.delegatedTo;
  const user = await User.findOne({
    where: {
      email: delegatedTo
    }
  });

  const project = await Project.findByPk(projectId);
  project.assignee = delegatedTo;
  project.delegatedTo = delegatedTo;
  project.UserId = user.id;
  await project.save();
  res.status(200).json(project);
});


router.post("/", [
  check("firstName", "First name is required.").not().isEmpty(),
  check("lastName", "Last name is required.").not().isEmpty(),
  check("email", "Please include a valid email.").isEmail(),
  check("password", "Please enter a password with more than 6 characters").isLength({
    min: 6
  }),
  check("permission", "Please submit user permission.").not().isEmpty(),

], async (req, res) => {
  const errors = validationResult(req);

  // Check for errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if user exists
  const { firstName, lastName, email, password, permission } = req.body;

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

    const created = await User.create({ firstName, lastName, email, password: hashedPassword, permission });



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