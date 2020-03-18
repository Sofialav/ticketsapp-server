const { Router } = require("express");
const router = new Router();
const Ticket = require("./model");

// add ticket
router.post("/tickets", async (req, res, next) => {
  // NEED TO ADD WRONG ID VALIDATION
  try {
    if (!req.body.price) {
      return req.status(400).send("Please supply ticket price!");
    } else if (!req.body.eventId || !req.body.userId) {
      return res.status(400).send("Please supply event and user ownership");
    } else {
      const newTicket = await Ticket.create(req.body);
      return res.json(newTicket);
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
