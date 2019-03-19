const conversationModels = require("../models/messageModels.js");

function getMessages(request, response) {
	var id = request.query.id;


	messageModels.getMessagesFromDb(id, function(error, result) {


		var messages = (result);
		//var dateFormat = require('dateformat');


		console.log(result);

	    response.json(result);

	});


}

module.exports = {
	getMessages: getMessages
	
};