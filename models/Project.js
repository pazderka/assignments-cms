const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

class Project extends Model { }

Project.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  impact: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  assignee: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  permission: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  delegatedTo: {
    type: DataTypes.STRING,
    allowNull: true
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  sequelize, // We need to pass the connection instance
  modelName: "Project" // We need to choose the model name
});

module.exports = Project;
