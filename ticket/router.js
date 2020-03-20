const { Router } = require("express");
const router = new Router();
const Ticket = require("./model");
const User = require("../user/model");
const Event = require("../event/model");
const Comment = require("../comment/model");

// add ticket
router.post("/tickets", async (req, res, next) => {
  // NEED TO ADD WRONG ID VALIDATION
  try {
    if (!req.body.price) {
      return res.status(400).send("Please supply ticket price!");
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
// get ticket by ID
router.get("/tickets/:ticketId", async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.ticketId, {
      include: [
        {
          model: User,
          attributes: { exclude: ["password", "email"] },
          required: false
        },
        Event,
        Comment
      ]
    });
    if (ticket) {
      return res.status(200).json(ticket);
    } else {
      return res.status(404).send("Ticket does not exist");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
