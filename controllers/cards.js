const path = require("path");
const { readJsonFile } = require("../helpers/fsModule");

const cardsFilePath = path.join(__dirname, "..", "data", "cards.json");

// path to cards.json:
const getCards = async (req, res) => {
  try {
    const users = await readJsonFile(cardsFilePath);
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

module.exports = { getCards };
