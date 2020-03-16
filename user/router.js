const { Router } = require("express");
const router = new Router();
const bcrypt = require("bcrypt");
const User = require("./model");

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
    next(error);
  }
});

module.exports = router;
