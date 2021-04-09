const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

const Project = require('./Project');
const Profile = require("./Profile");

class User extends Model { }

User.init({
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
  },
  permission: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "User"
});

User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(Project);
Project.belongsTo(User);

module.exports = User;
