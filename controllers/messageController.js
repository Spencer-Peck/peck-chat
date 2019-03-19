const messageModels = require("../models/messageModels.js");

function getMessages(request, response) {
	var id = request.query.id;
	var con_id = request.query.con_id;


	messageModels.getMessagesFromDb(id, con_id, function(error, result) {


		var messages = (result);
		//var dateFormat = require('dateformat');


		console.log(result);

	    response.json(result);

	});


}

module.exports = {
	getMessages: getMessages
	
};