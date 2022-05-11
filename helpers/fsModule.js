const fs = require("fs"); //module

// Use fsPromises.readFile() method
// to asynchronously read the entire contents of a file:
const readJsonFile = (filePath) =>
  fs.promises
    .readFile(filePath, { encoding: "utf8" })
    .then((data) => JSON.parse(data));

module.exports = { readJsonFile };
