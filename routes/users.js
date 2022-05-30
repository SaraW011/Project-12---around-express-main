const usersRouter = require("express").Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
} = require("../controllers/users");

// returns all users
usersRouter.get("/", getUsers);

// returns a user by _id
usersRouter.get("/:userid", getUserById);

// creates a new user
usersRouter.post("/", createUser);

// update profile
usersRouter.patch("/me", updateProfile);

// update avatar
usersRouter.patch("/me/avatar", updateAvatar);

module.exports = usersRouter;
