/*
Server side initialization. Standard stuff. copy and paste.
*/

//required npm packages
var express = require("express");
var bodyParser = require("body-parser");

// initialize the express object
var app = express();

// set the port
var PORT = process.env.PORT || 3000;

// static file init
app.use(express.static("app/public"));

// bodyParser makes it possible for our server to interpret data sent to it.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Requires the files that contain the routing of our Friend Finder
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Port listener
app.listen(PORT, function(){
  console.log("Welcome to Friend Finder Application !");
  console.log("App listening on PORT: " + PORT);
});