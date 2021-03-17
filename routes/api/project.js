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

// Get all
router.get("/", auth, async (req, res) => {
  const all = await Project.findAll();

  res.status(200).json(all);
});

router.post("/", auth, async (req, res) => {
  const { name, priority, progress, deadline, impact } = req.body;
  const UserId = req.user.id;

  const project = await Project.create({
    name, priority, progress, deadline, impact, UserId
  });

  res.status(200).json(project);
});

module.exports = router;