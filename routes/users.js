const express = require("express");
const { getUsers, getUserById } = require("../controllers/users.js");

const userRouter = express.Router();

userRouter.get("/users", getUsers);

userRouter.get("users/:user_id", getUserById);

module.exports = userRouter;
