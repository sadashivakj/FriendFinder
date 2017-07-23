/*
Javascript responsible for POST event listener. 
This will capture information entered by the new user.
Validate to see if the user has entered the mandatory fields.
Create new user object and send it to apiRoutes.js via POST function
It will also display the window with data once matching is found   
*/

$(document).ready(function(){
	$("#submitForm").on("click", function(event){
		event.preventDefault();

		//initialize the array object which captures new user info 
		var newUserResponse = [];
		//Loop through the questions #1 to #10 
		for(var i = 1; i < 11; i++){
			//Get the answer selected by the user from the drop down  
			var newUserAnswers = $("#Q" + i).val();
			//push it into newUserResponse array
			newUserResponse.push(parseInt(newUserAnswers));
		}

		//Get new user name and photo link entered by the new user
		var newUserName = $("#nameInput").val();
		var newUserPhotoLink = $("#photoInput").val();
		//validate the data entered by the user. Throw message if mandatory data is not entered
		var formResponse = validateData(newUserName, newUserPhotoLink, newUserResponse);
		
		if (formResponse === false){
			alert("Mandatory fields are Name, photo link and survey questions. Please fill those data...");
		}
		else {
			var newUserData = {
				name: $("#nameInput").val(),
				photo: $("#photoInput").val(),
				scores: newUserResponse
			};
			/*
			POST: Send new user's information to obtain a match
			Thanks to Brandon, he explained how to do handle POST request via fetch()
			parse the string response from apiRoutes.js to JSON response and
			construct the modal response data with pop up window 
			*/
			fetch("/api/friends",{method:'post',body:JSON.stringify(newUserData),headers:{
				"Content-Type":"application/json"
			}})
			.then(x => x.json())
			.then(function(data){
				//data object contains matched response which is a parsed JSON object
				//Construct the html page which shows the matched response in a separate modal window
				var modalHTML = "<div class='modal-content'>";
				modalHTML += "<span class='close'>&times;</span>";
				modalHTML += "<h2>You Found a Match..</h2><h1 id='matchName'>"+ data.name.toUpperCase() +"</h1>"
				modalHTML += "<img id='matchImage' src="+ data.photo +">";
				modalHTML += "</div>"

				// Actions to display the modal
				$("#myModal").append(modalHTML);

				//Get handle to the modal window
				var modal = document.getElementById('myModal');
				var span = document.getElementsByClassName("close")[0];

				//Displays the modal
		    	modal.style.display = "block";
		    	// When the modal is closed
		    	span.onclick = function() {
		    		modal.style.display = "none";
		    		refreshThePage();
				}
			});
		}
	});

	//Validating the data entered by the new user
	function validateData(newUser, newPhotoLink, newResponse){
		if(newUser === ""){
			return false;
		}
		else if (newPhotoLink === ""){
			return false;
		}
		else {
			for (var i = 0; i < newResponse.length; i++){
				if (isNaN(newResponse[i])){
					return false;
				}
			}
		}
		return true;
	}

	//This function will refresh the survey page and clear data entered by previous new user
	function refreshThePage(){
		//clear name and photo link input
		$("#nameInput").val("");
		$("#photoInput").val("");
		//empty the modal div
		$("#myModal").html("");
		//clear out the drop down selection made by the earlier new user 
		for(var i = 1; i < 11; i++){
			var answers = $("#Q" + i).val("");
		}
	}
});