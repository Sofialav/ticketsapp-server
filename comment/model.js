const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");
const Ticket = require("../ticket/model");

const Comment = db.define("comment", {
  text: { type: Sequelize.TEXT, allowNull: false }
});

Comment.belongsTo(User);
Comment.belongsTo(Ticket);
Ticket.hasMany(Comment);
User.hasMany(Comment);

module.exports = Comment;
