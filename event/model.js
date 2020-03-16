const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");

const Event = db.define("event", {
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT },
  logo: Sequelize.STRING,
  start_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: false
    // default === start_date
  }
});

Event.belongsTo(User);

module.exports = Event;
