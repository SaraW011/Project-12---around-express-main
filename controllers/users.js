const { readJsonFile } = require("../helpers/fsModule");
const path = require("path");
const usersFilePath = path.join(__dirname, "..", "data", "users.json");

// path to users.json:
const getUsers = async (req, res) => {
  try {
    const users = await readJsonFile(usersFilePath);
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

//find a user:
const getUserById = async (req, res) => {
  try {
    const users = readJsonFile(usersFilePath);
    const user = await users.find((user) => user.id === req.params.user_id);
    if (!user) {
      res.status(404).send({ message: "User ID not found" });
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

module.exports = { getUsers, getUserById };
