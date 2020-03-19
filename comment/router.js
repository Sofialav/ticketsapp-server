const { Router } = require("express");
const router = new Router();
const Comment = require("./model");

// add comment
router.post("/comments", async (req, res, next) => {
  // NEED TO ADD WRONG ID VALIDATION
  try {
    if (!req.body.text) {
      return res.status(400).send("Please supply comment text!");
    } else if (!req.body.ticketId || !req.body.userId) {
      return res.status(400).send("Please supply ticket and user ownership");
    } else {
      const newComment = await Comment.create(req.body);
      return res.json(newComment);
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
