const express = require("express");
const router = express.Router();

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Project = require("../../models/Project");
const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

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

router.post("/", [auth, [
  check("office", "Office is required").not().isEmpty(),
  check("manager", "Manager is required").not().isEmpty(),
]], async (req, res) => {
  console.log(req.body.manager);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const UserId = req.user.id;

  const user = await User.findByPk(UserId);
  const userEmail = user.email;


  // create new pw
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
    const profile = await Profile.create({
      office: req.body.office,
      position: req.body.position || "employee",
      manager: req.body.manager,
      tasksToday: projects.count,
      UserId
    });



    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
