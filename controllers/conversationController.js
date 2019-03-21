const conversationModels = require("../models/conversationModels.js");


function getConversations(request, response) {
	//var id = request.query.id;
	var id = request.session.user.id;
	//console.log(session.user.id);
	console.log("We have made it to the controller");


	conversationModels.getConversationsFromDb(id, function(error, result) {


		var conversations = (result);
		//var dateFormat = require('dateformat');


		console.log(result);

	    response.json(result);

	});


}

function getConversationNames(request, response) {
	var user_id = request.query.user_id;
	var conversation_id = request.query.conversation_id;
	var other_id = request.query.other_id;
	console.log("Getting conversation names...");


	conversationModels.getConversationNamesFromDb(user_id, conversation_id, other_id, function(error, result) {


		var conversations = (result);
		//var dateFormat = require('dateformat');


		console.log(result);

	    response.json(result);

	});


}






module.exports = {
	getConversations: getConversations,
	getConversationNames: getConversationNames
};