const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const sequelize = require("sequelize");

const Project = require("../../models/Project");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

/**
 * @path : "/user"
 * @req : post
 * @isAuth : true
 * @purpose : Get all unfinished projects by user
 */
router.post("/user", [
  check("assignee", "Assignee is required").not().isEmpty()
], auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const assignee = req.body.assignee;
    const projects = await Project.findAll({
      where: {
        assignee,
        status: {
          [sequelize.Op.not]: "Completed"
        }
      },
      attributes: {
        exclude: ["UserId"]
      }
    });

    res.status(200).json(projects);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/complete/:ProjectId"
 * @req : put
 * @isAuth : true
 * @purpose : Complete project by id
 */
router.put("/complete/:ProjectId", auth, async (req, res) => {
  try {
    const id = req.params.ProjectId;
    const project = await Project.findByPk(id);

    project.status = "Completed";
    await project.save();
    res.status(200).json("Project completed");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/:ProjectId"
 * @req : get
 * @isAuth : true
 * @purpose : Get project by id
 */
router.get("/:ProjectId", auth, async (req, res) => {
  try {
    const id = req.params.ProjectId;
    const assignemnt = await Project.findByPk(id);
    res.status(200).json(assignemnt);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/:ProjectId"
 * @req : delete
 * @isAuth : true
 * @purpose : Delete project by id
 */
router.delete("/:ProjectId", auth, async (req, res) => {
  try {
    const id = req.params.ProjectId;
    await Project.destroy({
      where: {
        id
      }
    });

    res.status(200).json({
      msg: "Deleted"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/"
 * @req : get
 * @isAuth : true
 * @purpose : Get all projects
 */
router.get("/", auth, async (req, res) => {
  try {
    const all = await Project.findAll();
    res.status(200).json(all);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/last"
 * @req : post
 * @isAuth : true
 * @purpose : Get last assigned project that is not completed
 */
router.post("/last", [
  check("assignee", "Assignee is required").not().isEmpty()
], auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const assignee = req.body.assignee;
    const lastProject = await Project.findAll({
      limit: 1,
      where: {
        assignee,
        status: {
          [sequelize.Op.not]: "Completed"
        }
      },
      order: [
        ["createdAt", "DESC"]
      ]
    });
    res.status(200).json(lastProject);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/"
 * @req : post
 * @isAuth : true
 * @purpose : Update profile and create project
 */
router.post("/", auth, [
  check("name", "Name is required").not().isEmpty(),
  check("priority", "Priority is required").not().isEmpty(),
  check("progress", "Progress is required").not().isEmpty(),
  check("deadline", "Deadline is required").not().isEmpty(),
  check("impact", "Impact is required").not().isEmpty(),
  check("assignee", "Assignee is required").not().isEmpty(),
  check("assignee", "Assignee must be a valid email").isEmail(),
  check("permission", "Permission is required").not().isEmpty(),
  check("description", "Description is required").not().isEmpty(),
  check("status", "Status is required").not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, priority, progress, deadline, impact, assignee, permission, delegatedTo, description, status } = req.body;

    const user = await User.findOne({
      where: {
        email: assignee
      }
    });

    const profile = await Profile.findByPk(user.id);

    const tasksToday = parseInt(profile.tasksToday);

    profile.tasksToday = tasksToday + 1;
    await profile.save();

    const project = await Project.create({
      name, priority, progress, deadline, impact, assignee, permission, delegatedTo, description, status
    });

    res.status(200).json(project);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @path : "/description"
 * @req : post
 * @isAuth : true
 * @purpose : Get project description
 */
router.post("/description", [
  check("projectId", "Project ID is required").not().isEmpty()
], auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const projectId = req.body.projectId;
    const project = await Project.findByPk(projectId);

    res.status(200).json(project.description);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server errlr");
  }
});

/**
 * @path : "/update"
 * @req : put
 * @isAuth : true
 * @purpose : Update project
 */
router.put("/update", [
  check("data", "Project is required").not().isEmpty()
], auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { data } = req.body;
    const projectId = data[0].projectId;

    const project = await Project.findByPk(projectId);

    for (const item in data[0]) {
      if (item !== "projectId") {
        project[item] = data[0][item];
      }
    }

    await project.save();
    res.status(200).json({
      msg: "success",
      updatedProject: project
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
