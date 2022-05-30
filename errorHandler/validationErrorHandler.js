const NOTFOUND_ERROR_CODE = 404;
const INVALID_DATA_ERROR_CODE = 400;
const SERVER_ERROR_CODE = 500;

// orFail() custom code:
const apiValidationError = () => {
  const error = new Error("Not found");
  error.name = "Not Found";
  error.statusCode = 404;
  throw error; // Remember to throw an error so .catch handles it instead of .then
};

module.exports = {
  NOTFOUND_ERROR_CODE,
  INVALID_DATA_ERROR_CODE,
  SERVER_ERROR_CODE,
  apiValidationError
};
