const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;

const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use(userRouter);
app.use(cardsRouter);

//Localhost 3000 message:
app.get("/", (req, res) => {
  res.send("You've been served!");
});

// Non-existent address:
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Hi cookie, your app is listening on port ${PORT}`);
});
