const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");
const Event = require("../event/model");

const Ticket = db.define("ticket", {
  price: { type: Sequelize.FLOAT, allowNull: false },
  description: Sequelize.TEXT,
  picture: Sequelize.STRING
});

Ticket.belongsTo(User);
Ticket.belongsTo(Event);
Event.hasMany(Ticket);
User.hasMany(Ticket);

module.exports = Ticket;
