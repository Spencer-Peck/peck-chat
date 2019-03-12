const conversationModels = ("../models/conversationModels.js");


function getConversations(request, response) {
	var id = request.query.id;


	conversationModels.getConversationsFromDb(id, function(error, result) {

		var conversations = result;




	    response.status(200).json(result[0]);


	});
}

module.exports = {
	getConversations: getConversations
};