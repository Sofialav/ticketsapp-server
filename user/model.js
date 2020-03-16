const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  }
});

module.exports = User;
