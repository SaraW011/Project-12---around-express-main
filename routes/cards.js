const express = require("express");

//not working needs work
const cardRouter = express.Router();
const { getCards } = require("../controllers/cards");

cardRouter.get("/cards", getCards);

module.exports = cardRouter;
