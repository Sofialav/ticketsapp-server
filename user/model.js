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
    validate: {
      // TO FIX VALIDATION
      len: { args: 6, msg: "Password length should be at least 6 symbols" }
    }
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
