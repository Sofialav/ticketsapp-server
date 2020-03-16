const express = require("express");
const cors = require("cors");
const userRouter = require("./user/router");
const eventRouter = require("./event/router");

const port = process.env.PORT || 4000;
const app = express();
const corsMW = cors();
const parserMW = express.json();

app.use(corsMW);
app.use(parserMW);
app.use(userRouter);
app.use(eventRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
