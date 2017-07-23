/*
apiRoutes.js should have -  
	GET route with the url "/api/friends". This will be used to display a JSON of all possible friends.
	POST routes "/api/friends". This will be used to handle incoming survey results. 
	This route will also be used to handle the compatibility logic.
*/

// Require the list of all existing users, i.e. the participants array
var apiFriendsList = require("../data/friends.js");

// We will be exporting the API routing (imported at server.js)
module.exports = function(app) {

	// GET: This sends the JSON of the existing API friends list read from friends.js
	app.get("/api/friends", function(req, res){
		res.json(apiFriendsList);
	});

	// POST: Grabs the data of the new user, calculates compatibility, adds new
	// user to the user's list, and sends the JSON data of the match
	app.post("/api/friends", function(newUserReq, newUserRes){

		// The object that includes the new user's responses
		var newUserData = newUserReq.body;
		
		var totDiff = 0;
		var closeDiff;
		var matchingFriend;

		// Find the best match for the new user by comparing the difference 
		// between the new user's scores against those from other users, 
		// question by question. Add up the differences to calculate the 
		// totalDifference. The closest match will be the user with the 
		// least amount of difference.
		// ---------------------------------------------------------------------------
		for (var j = 0; j < apiFriendsList.length; j++){
			//this will hold total difference value
			totDiff = 0;

			for (var k = 0; k < newUserData.scores.length; k++){
				totDiff += Math.abs(apiFriendsList[j].scores[k] - newUserData.scores[k]);
			} 
			//initialize the variable which will hold close difference
			if (closeDiff === undefined){
				closeDiff = totDiff;
			}

			if (totDiff <= closeDiff){
				closeDiff = totDiff;
				matchingFriend = apiFriendsList[j];
			}
		}
		
		apiFriendsList.push(newUserData);
		
		newUserRes.json(matchingFriend);
	});
}