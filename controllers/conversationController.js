const conversationModels = require("../models/conversationModels.js");
var dateFormat = require('dateformat');


function getConversations(request, response) {
	var id = request.query.id;
	console.log("We have made it to the controller");


	conversationModels.getConversationsFromDb(id, function(error, result) {


		var conversations = JSON.parse(result);

		$.each(conversations, function(i, item) {
			item.created_at = dateFormat(item.created_at, "mmmm dS, dddd");
		});





		console.log(result);

	    response.json();


	});
}

module.exports = {
	getConversations: getConversations
};