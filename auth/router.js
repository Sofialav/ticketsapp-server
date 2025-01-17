const { Router } = require("express");
const bcrypt = require("bcrypt");
const { toJWT } = require("./jwt");
const User = require("../user/model");
const auth = require("./middleware");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.login || !req.body.password) {
      res.status(400).send({
        message: "Please supply valid login and password"
      });
    } else {
      const entity = await User.findOne({ where: { login: req.body.login } });
      if (!entity) {
        res.status(400).send({
          message: "User with that login does not exist"
        });
      }
      // check the password against the stored hash
      else if (bcrypt.compareSync(req.body.password, entity.password)) {
        // if the password is correct, return a JWT with the userId of the user (user.id)
        res.send({
          jwt: toJWT({ userId: entity.id })
        });
      } else {
        res.status(400).send({
          message: "Password was incorrect"
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Something went wrong"
    });
  }
});
// secret endpoint
router.get("/users/loggedUser", auth, (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user);
});

module.exports = router;
