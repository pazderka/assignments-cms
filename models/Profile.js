const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
class Profile extends Model { }

Profile.init({
  // Model attributes are defined here
  office: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  manager: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  tasksToday: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  sequelize,
  modelName: "Profile"
});

module.exports = Profile;
