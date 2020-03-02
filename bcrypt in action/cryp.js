var bcrypt = require("bcryptjs");

bcrypt.genSalt(10, function(err, salt) {
  console.log(salt);
  if (err) {
    console.log(err);
  }

  bcrypt.hash("word", salt, function(err, hash) {
    console.log(hash);
    if (err) {
      console.log(err);
    }
  });

  //console.log(hash);

  // bcrypt.hash("word", salt, function(err, hash) {
  //   console.log(hash);
  // });
});

// console.log(hash);

// bcrypt.compare("word", hash, function(err, res) {
//   console.log(res);
//   // console.log(hash);
// });

//module.exports = hash;
// bcrypt.genSalt(10, function(err, salt1) {
//   console.log(salt1);

//   bcrypt.hash("word", salt1, function(err, hash1) {
//     console.log(hash1);
//   });
// });
