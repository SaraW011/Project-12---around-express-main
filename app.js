const express = require("express");
const mongoose = require("mongoose");
// get body in root request:
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();

const { PORT = 3000 } = process.env;

// connect to MongoDB server
mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(helmet());
// support parsing of application/json type post data:
app.use(bodyParser.json());

const cardsRouter = require("./routes/cards");
const userRouter = require("./routes/users");
// const clientErrorHandler = require("./errorHandler/validationErrorHandler");

app.use(userRouter);
app.use(cardsRouter);
// app.use(clientErrorHandler);

// Localhost 3000 message:
app.get("/", (req, res) => {
  res.send("You've been served!");
});

// Implementing a Temporary Authorization Solution by hardcoding:
app.use((req, res, next) => {
  req.user = {
    _id: "62948a0e7e0fe1d83c2358cc" // paste the _id of the test user created in the previous step
  };

  next();
});

// Non-existent address:
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Hi cookie, your app is listening on port ${PORT}`);
});
