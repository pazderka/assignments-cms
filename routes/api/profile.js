const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Project = require("../../models/Project");

/**
 * @path : "/me"
 * @req : get
 * @isAuth : true
 * @purpose :  Get logged in user profile
 */
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      raw: true,
      where: {
        id: req.user.id
      },
    });

    if (!profile) {
      return res.json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/"
 * @req : post
 * @isAuth : true
 * @purpose :  Create user profile
 */
router.post("/", [auth, [
  check("office", "Office is required").not().isEmpty(),
  check("manager", "Manager is required").not().isEmpty(),
  check("department", "Department is required").not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const UserId = req.user.id;

  const user = await User.findByPk(UserId);
  const userEmail = user.email;

  const salt = await bcrypt.genSalt(10);
  const new_password = req.body.password;
  const hashedPassword = await bcrypt.hash(new_password, salt);

  user.password = hashedPassword;
  await user.save();

  const projects = await Project.findAndCountAll({
    where: {
      assignee: userEmail
    }
  });

  try {
    const { office, department, manager } = req.body;
    const profile = await Profile.create({
      office,
      department,
      manager,
      tasksToday: projects.count,
      UserId
    });

    res.status(200).json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
