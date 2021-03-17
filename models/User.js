const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const Project = require('./Project');
const Profile = require("./Profile");

class User extends Model { }

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize, // We need to pass the connection instance
  modelName: "User" // We need to choose the model name
});

// Associate models
User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(Project);
Project.belongsTo(User);

module.exports = User;
