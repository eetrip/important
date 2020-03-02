var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

// a comment

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("CREATE DATABASE IF NOT EXISTS xelpapp", function(err, result) {
    if (err) throw err;
  });
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "xelpapp"
});

connection.connect(function(err) {
  if (err) throw err;
  var sql =
    "CREATE TABLE IF NOT EXISTS users (username VARCHAR(255), phone VARCHAR(255), email VARCHAR(255), password VARCHAR(255))";
  connection.query(sql, function(err, result) {
    if (err) throw err;
  });
});

var app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Providing permission to javascript to access static files from any directory.
app.use(express.static(__dirname));

app.get("/login", function(request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

app.get("/signup", function(request, response) {
  response.sendFile(path.join(__dirname + "/signup.html"));
});

app.post("/signup", function(request, response) {
  var username = request.body.username;
  var phone = request.body.phone;
  var email = request.body.email;
  var password = request.body.password;
  var users = {
    username,
    phone,
    email,
    password
  };
  connection.query("INSERT INTO users SET ?", users, function(
    error,
    results,
    fields
  ) {
    if (error) {
      response.json({
        status: false,
        message: "there are some error with query"
      });
    } else {
      response.redirect("/login");
    }
  });
});

app.post("/auth", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect("/dashboard");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }

  app.get("/dashboard", function(request, response) {
    response.sendFile(path.join(__dirname + "/dashboard.html"));
  });
});

const port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Server Lisening On Port : " + port);
});
