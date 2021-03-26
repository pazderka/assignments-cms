const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Project = require("../../models/Project");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const sequelize = require("sequelize");

// Get by user
router.post("/user", auth, async (req, res) => {
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

  console.log(projects);


  res.status(200).json(projects);
});

// Complete project
router.put("/complete/:ProjectId", auth, async (req, res) => {
  const id = req.params.ProjectId;
  const project = await Project.findByPk(id);

  project.status = "Completed";
  await project.save();
  res.status(200).json("Project completed");
});

// Get by id
router.get("/:ProjectId", auth, async (req, res) => {
  const id = req.params.ProjectId;
  const assignemnt = await Project.findByPk(id);
  res.status(200).json(assignemnt);
});

// Delete by id
router.delete("/:ProjectId", auth, async (req, res) => {
  const id = req.params.ProjectId;
  await Project.destroy({
    where: {
      id
    }
  });

  res.status(200).json({
    msg: "Deleted"
  });
});

// Get all
router.get("/", auth, async (req, res) => {
  const all = await Project.findAll();

  res.status(200).json(all);
});

router.post("/last", auth, async (req, res) => {
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
});

router.post("/", auth, async (req, res) => {
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
});

// Get project description
router.post("/description", auth, async (req, res) => {
  const projectId = req.body.projectId;
  const project = await Project.findByPk(projectId);

  res.status(200).json(project.description);
});

// Update project
router.put("/update", auth, async (req, res) => {
  const { data } = req.body;
  const projectId = data[0].projectId;

  const project = await Project.findByPk(projectId);

  console.log(data);

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
});

module.exports = router;