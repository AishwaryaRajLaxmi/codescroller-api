const { checkMongoObject } = require("./dbHelper");
const constants = require("./constants");

module.exports.customCallback = (value, option) => {
  if (!checkMongoObject(value)) return option.message("Invalid Object Id");
  return true;
};
