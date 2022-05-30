const Card = require("../models/card");

const {
  NOTFOUND_ERROR_CODE, // 404
  INVALID_DATA_ERROR_CODE, // 400
  SERVER_ERROR_CODE, // 500
  apiValidationError // 404 orFail()
} = require("../errorHandler/validationErrorHandler");

// get existing cards from db:
const getCards = (req, res) => {
  Card.find({})
    .orFail(apiValidationError) // saves if statement
    .then((cardData) => {
      res.status(200).send(JSON.parse(cardData));
      // skipped, because an error was thrown
    })
    .catch((err) => {
      // handle error and return a message
      if (err.name === "CastError") { // Mongoose.prototype.CastError()
        res.status(INVALID_DATA_ERROR_CODE).send({ message: `${err.message}, incorrect data` });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: `${err.message}, no connection, try again later` });
    });
};

// Create a new card:
const createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then(() => {
      res.status(200).send({ message: "card creation successfull" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(NOTFOUND_ERROR_CODE).send({ message: `${err.message}, could not find data` });
      }
      if (err.name === "ValidationError") { // mongoose public class ValidationError
        res.status(INVALID_DATA_ERROR_CODE).send({ messege: `${err.message}, incorrect data` });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ messege: `${err.message}` });
    });
};

// delete owner card:
const deleteCard = (req, res) => {
  const cardId = req.params.card_id;
  Card.deleteOne(cardId)
    .orFail(apiValidationError)
    .then(() => {
      res.status(200).send({ message: "card deleted" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(INVALID_DATA_ERROR_CODE).send({ message: `${err.message}, incorrect data` });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: `${err.message}, no connection, try again later` });
    });
};

// like card one time:
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(apiValidationError)
    .then((card) => {
      res.status(200).send(card.likes);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(INVALID_DATA_ERROR_CODE).send({ message: `${err.message}, incorrect data` });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: `${err.message}, no connection, try again later` });
    });
};

// Dislike card:
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(apiValidationError)
    .then((card) => {
      res.status(200).send(card.likes);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(INVALID_DATA_ERROR_CODE).send({ message: `${err.message}, incorrect data` });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: `${err.message}, no connection, try again later` });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};
