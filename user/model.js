const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: { args: true, msg: "Username already in use!" }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { len: [8, 12], msg: "Password length should be 8-12 symbols" }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: { args: true, msg: "Please provide valid email!" }
    },
    unique: { args: true, msg: "Email address already in use!" }
  }
});

module.exports = User;
