const { readJsonFile } = require("../helpers/fsModule");
const path = require("path");
const usersFilePath = path.join(__dirname, "..", "data", "users.json");

// path to users.json:
const getUsers = async (req, res) => {
  try {
    const users = await readJsonFile(usersFilePath);
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

//find a user:
const getUserById = async (req, res) => {
  try {
    const users = await readJsonFile(usersFilePath);
    const id = users.find((user) => user.id === req.params._id);
    if (!id) {
      res.status(404).send({ message: "User ID not found" });
    } else {
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

module.exports = { getUsers, getUserById };
