const express = require("express");

const cardRouter = express.Router();
const { getCards } = require("../controllers/cards");

cardRouter.get("/cards", getCards);

module.exports = cardRouter;
