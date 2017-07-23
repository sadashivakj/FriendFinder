/*
htmlRoutes.js will manage following functionalities - 
	GET Route to "/survey" which should display the survey page.
	default "/" route that leads to home.html which displays the home page.
*/

// Require path package to get the correct file path to our html
var path = require("path");

//server.js will import this file
module.exports = function(app){
	// GET: request opens up survey.html file
	app.get("/survey", function(req, res){
		res.sendFile(path.join(__dirname, "/../public/survey.html"));
	});

	// "/" submit to home.html page
	app.use("/", function(req, res){
		res.sendFile(path.join(__dirname, "/../public/home.html"));
	});
}