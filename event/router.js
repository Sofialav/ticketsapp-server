const { Router } = require("express");
const router = new Router();
const Event = require("./model");

// get events (pagination)
router.get("/events", (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 500);
  const offset = req.query.offset || 0;
  Event.findAndCountAll({ limit, offset })
    .then(result => {
      if (result.count) {
        return res.send({ events: result.rows, total: result.count });
      } else {
        res.status(404).send("No events exist");
      }
    })
    .catch(next);
});
// create a new event
router.post("/events", (req, res, next) => {
  Event.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(next);
});

module.exports = router;
