const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
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

// Associate 2 models
User.hasOne(Profile);
Profile.belongsTo(User);

module.exports = User;
