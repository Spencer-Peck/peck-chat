const conversationModels = ("../model/conversationModels.js");


function getConversations(request, response) {
	var id = request.query.id;
	console.log("We have mad it to the controller");


	conversationModels.getConversationsFromDb(id, function(error, result) {

		var conversations = result;




	    response.status(200).json(result[0]);


	});
}

module.exports = {
	getConversations: getConversations
};