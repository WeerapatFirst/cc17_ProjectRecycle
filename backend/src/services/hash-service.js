const bcrypt = require("bcryptjs");

const hashService = {};

hashService.hash = (plainText) => bcrypt.hash(plainText, 10);
hashService.compare = (plainText, hashvalue) =>
  bcrypt.compare(plainText, hashvalue);

module.exports = hashService;
