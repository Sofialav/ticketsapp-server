const { Router } = require("express");
const router = new Router();
const Ticket = require("./model");
const User = require("../user/model");
const Event = require("../event/model");
const Comment = require("../comment/model");
const moment = require("moment");

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
          attributes: { exclude: ["password", "email", "updatedAt"] },
          required: false,
          include: [{ model: Ticket, attributes: ["id", "price"] }]
        },
        {
          model: Event,
          include: [{ model: Ticket, attributes: ["id", "price"] }]
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "login"] }]
        }
      ]
    });
    if (ticket) {
      const fraud = await fraudCalc(ticket);
      const finalResult = { ...ticket.dataValues, fraud };
      return res.status(200).json(finalResult);
    } else {
      return res.status(404).send("Ticket does not exist");
    }
  } catch (error) {
    next(error);
  }
});
// fraud calculation
fraudCalc = ticket => {
  let risk = 0;
  // price deduction
  const allTickets = ticket.event.tickets.map(ticket => ticket.price);
  const avgPrice =
    allTickets.reduce((acc, current) => {
      return acc + current;
    }) / ticket.event.tickets.length;
  const ticketPrice = ticket.price;
  const priceDeduction = (ticketPrice / avgPrice - 1) * 100;
  if (priceDeduction < 0) {
    risk += Math.abs(priceDeduction);
  } else if (priceDeduction > 0 && priceDeduction <= 10) {
    risk -= priceDeduction;
  } else risk -= 10;
  // time deduction
  let creationTime = parseInt(moment(ticket.createdAt).format("H"));
  if (creationTime >= 9 && creationTime < 17) {
    risk -= 10;
  } else risk += 10;
  // ticket numbers deduction
  let userTickets = ticket.user.tickets;
  if (userTickets.length === 1) {
    risk += 10;
  }
  // comments deduction
  let comments = ticket.comments.length;
  if (comments > 3) {
    risk += 5;
  }
  //range 5%-95%
  if (risk < 5) {
    risk = 5;
  } else if (risk > 95) {
    risk = 95;
  }
  return risk;
};

module.exports = router;
