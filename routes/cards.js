const cardsRouter = require("express").Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require("../controllers/cards");

// returns all cards
cardsRouter.get("/", getCards);

// creates a new card
cardsRouter.post("/", createCard);

// deletes a card by _id
cardsRouter.delete("/:cardId", deleteCard);

// like a card
cardsRouter.put("/:cardId/likes", likeCard);

// unlike a card
cardsRouter.delete("/:cardId/likes", dislikeCard);

module.exports = cardsRouter;
