var bcrypt = require("bcrypt-nodejs");

const showpass = bcrypt.hashSync("admin123", bcrypt.genSaltSync(5), null);

console.log(showpass);
