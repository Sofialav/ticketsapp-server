const express = require("express");
const cors = require("cors");
const userRouter = require("./user/router");
const eventRouter = require("./event/router");
const ticketRouter = require("./ticket/router");

const port = process.env.PORT || 4000;
const app = express();
const corsMW = cors();
const parserMW = express.json();

app.use(corsMW);
app.use(parserMW);
app.use(userRouter);
app.use(eventRouter);
app.use(ticketRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
