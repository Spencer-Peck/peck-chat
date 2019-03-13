const conversationModels = require("../models/conversationModels.js");


function getConversations(request, response) {
	var id = request.query.id;
	console.log("We have made it to the controller");


	conversationModels.getConversationsFromDb(id, function(error, result) {


		var conversations = result;




	    response.status(200).json(result);


	});
}

module.exports = {
	getConversations: getConversations
};