const conversationModels = require("../models/conversationModels.js");


function getConversations(request, response) {
	var id = request.query.id;
	console.log("We have made it to the controller");


	conversationModels.getConversationsFromDb(id, function(error, result) {


		var conversations = JSON.parse(result);
		//var dateFormat = require('dateformat');

		$.each(conversations, function(i, item) {
		//	item.created_at = dateFormat(item.created_at, "mmmm dS, dddd");
		if (item.avatar_url == null)
		{
			item.avatar_url = "https://ptetutorials.com/images/user-profile.png";
			console.log("avatar is null");
		}
	});


		console.log(result);

	    response.json();

	});
}

module.exports = {
	getConversations: getConversations
};