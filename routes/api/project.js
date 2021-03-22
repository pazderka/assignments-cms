const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Project = require("../../models/Project");

// Get by user
router.get("/user", auth, async (req, res) => {
  const UserId = req.user.id;
  const projects = await Project.findAll({
    where: {
      UserId
    },
    attributes: {
      exclude: ["UserId", "createdAt", "updatedAt"]
    }
  });


  res.status(200).json(projects);
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

router.post("/", auth, async (req, res) => {
  const { name, priority, progress, deadline, impact, assignee, permission, delegatedTo, description } = req.body;

  const UserId = req.user.id;

  const project = await Project.create({
    name, priority, progress, deadline, impact, UserId, assignee, permission, delegatedTo, description
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