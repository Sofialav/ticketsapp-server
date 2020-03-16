const express = require("express");
const cors = require("cors");
const user = require("./user/model");
const db = require("./db");

const port = process.env.PORT || 4000;
const app = express();
const corsMW = cors();
const parserMW = express.json();

app.use(corsMW);
app.use(parserMW);

app.listen(port, () => console.log(`Listening on port ${port}`));
