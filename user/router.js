const { Router } = require("express");
const Sequelize = require("sequelize");
const router = new Router();
const bcrypt = require("bcrypt");
const User = require("./model");
const Ticket = require("../ticket/model");

router.post("/users", async (req, res, next) => {
  try {
    if (!req.body.login || !req.body.password || !req.body.email) {
      return res.status(400).send("Please supply username, email and password");
    } else {
      const user = {
        login: req.body.login,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      };
      const userPost = await User.create(user);
      return res.json(userPost);
    }
  } catch (error) {
    if (Sequelize.ValidationError) {
      const message = error.errors.map(error => error.message);
      res.status(400).json(message);
    }
    next(error);
  }
});
// get user by ID
router.get("/users/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: { exclude: ["password"] },
      include: [Ticket]
    });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).send("User does not exist");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
