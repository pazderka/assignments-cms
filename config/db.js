const { Sequelize, DataTypes, Model } = require("sequelize");
const config = require("config");

const db = config.get("db");
const { name, user, password, host, dialect } = db;

const sequelize = new Sequelize(name, user, password, {
  host,
  dialect
}, {
  freezeTableName: true,
  timeStamps: true
});

sequelize.sync();

module.exports = sequelize;