const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

const User = require("../../models/User");
const Project = require("../../models/Project");

/**
 * @path : "/"
 * @req : get
 * @isAuth : true
 * @purpose : Get all users
 */
router.get("/", auth, async (req, res) => {
  try {
    const all = await User.findAll();
    res.status(200).json(all);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/:UserId"
 * @req : delete
 * @isAuth : true
 * @purpose : Delete user by id
 */
router.delete("/:UserId", auth, async (req, res) => {
  try {
    const id = req.params.UserId;
    await User.destroy({
      where: {
        id
      }
    });
    res.status(200).send("User deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/manager"
 * @req : get
 * @isAuth : true
 * @purpose : Get all managers
 */
router.get("/manager", auth, async (req, res) => {
  try {
    const managers = await User.findAll({
      where: {
        permission: "manager"
      }
    });
    res.status(200).json(managers);
  } catch {
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/permission"
 * @req : post
 * @isAuth : true
 * @purpose : Get user permission
 */
router.post("/permission", auth, async (req, res) => {
  try {
    const UserId = req.user.id;
    const user = await User.findByPk(UserId);
    res.status(200).json(user.permission);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/delegate"
 * @req : put
 * @isAuth : true
 * @purpose : Delegate project
 */
router.put("/delegate", [
  check("projectId", "Project ID is required").not().isEmpty(),
  check("delegatedTo", "Delegated to is required").not().isEmpty()
], auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
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
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
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

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, email, password, permission } = req.body;
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists." }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const created = await User.create({ firstName, lastName, email, password: hashedPassword, permission });

    const payload = {
      user: {
        id: created.id
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;

      res.json({ token });
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
