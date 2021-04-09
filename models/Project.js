const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Project extends Model { }

Project.init({
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
  sequelize,
  modelName: "Project"
});

module.exports = Project;
