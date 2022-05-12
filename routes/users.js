const express = require("express");
const { getUsers, getUserById } = require("../controllers/users");

const userRouter = express.Router();

userRouter.get("/users", getUsers);

userRouter.get("/users/:_id", getUserById);

module.exports = userRouter;
