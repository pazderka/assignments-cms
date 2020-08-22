const { Sequelize } = require("sequelize");
const config = require("config");

const db = config.get("db");
const { name, user, password, host, dialect } = db;

const sequelize = new Sequelize(name, user, password, {
  host,
  dialect
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to sequelize...");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

module.exports = connectDb;