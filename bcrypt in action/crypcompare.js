var app = require("express");
app.use(express.static(__dirname));
var bcrypt = require("bcrypt");
import hash from "./cryp";

bcrypt.compare("word", hash, function(err, res) {
  console.log(res);
  // console.log(hash);
});
