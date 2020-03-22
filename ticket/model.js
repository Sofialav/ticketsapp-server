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

// const dummy = Ticket.bulkCreate(
//   [
//     {
//       price: 16.0,
//       description: "This is Ticket!",
//       eventId: "8",
//       userId: "1"
//     },
//     {
//       price: 15.0,
//       description: "This is Ticket!",
//       eventId: "8",
//       userId: "1"
//     },
//     {
//       price: 16.3,
//       description: "This is Ticket!",
//       eventId: "8",
//       userId: "1"
//     }
//   ],
//   { validate: true }
// );
// db.sync()
//   .then(() => dummy)
//   .then(() => console.log("Data base updated successfully"))
//   .catch(err => {
//     console.error("Unable to create tables, shutting down...", err);
//     process.exit(1);
//   });
module.exports = Ticket;
