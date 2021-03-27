const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Project = require("../../models/Project");
const Profile = require("../../models/Profile");

/**
 * @path : "/"
 * @req : get
 * @isAuth : true
 * @purpose : Get all statistics for projects and profiles
 */
router.get("/", auth, async (req, res) => {
  try {
    const allProjects = await Project.findAll();
    const allProfiles = await Profile.findAll();

    res.status(200).json({
      allProjects,
      allProfiles
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
