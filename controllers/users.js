const User = require("../models/user");

const {
  NOTFOUND_ERROR_CODE, // 404
  INVALID_DATA_ERROR_CODE, // 400
  SERVER_ERROR_CODE, // 500
  apiValidationError // 404 orFail()
} = require("../errorHandler/validationErrorHandler");

// get all user from db:
const getUsers = (req, res) => {
  User.find({})
    .orFail(apiValidationError) // saves if statement
    .then((users) => {
      res.status(200).send(users);
      // skipped, because an error was thrown
    })
    .catch((err) => {
      // handle error and return a message
      console.log(
        `${err.name} with the message ${err.message} has occured, but we've handled it`
      );
      if (err.name === "CastError") {
        res.status(INVALID_DATA_ERROR_CODE).send({ message: `${err.message}, incorrect data` });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: `${err.message}, no connection, try again later` });
    });
};

// find user by ID:
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).send(user);
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

// create new user:
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ message: `User ${user} created successfuly` });
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

// update user profile:
const updateProfile = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(apiValidationError)
    .then((user) => {
      res.status(200).send({ message: `Profile ${user} updated successfuly` });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(INVALID_DATA_ERROR_CODE).send({ message: `${err.message}, incorrect data` });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: `${err.message}, no connection, try again later` });
    });
};

// update user avatar:
const updateAvatar = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(apiValidationError)
    .then((user) => {
      res.status(200).send({ message: `Avatar ${user} updated successfuly` });
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
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
};
