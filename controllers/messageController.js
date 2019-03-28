const messageModels = require("../models/messageModels.js");

function getMessages(request, response) {
	var id = request.session.user.id;
	var con_id = request.query.con_id;


	messageModels.getMessagesFromDb(id, con_id, function(error, result) {


		var messages = (result);
		//var dateFormat = require('dateformat');


		console.log(result);

	    response.json(result);

	});


}

function sendMessage(request, response) {
	var id = request.session.user.id;
	var con_id = request.body.con_id;
	var content = request.body.content;

	console.log("this is id: " + id);
	console.log("this is con id: " + con_id);
	console.log("this is content: " + content);

	console.log(con_id);


	messageModels.sendMessageToDb(id, con_id, content, function(error, result) {


		//var messages = (result);
		//var dateFormat = require('dateformat');


		console.log(result);

	    response.json(result);

	});


}

module.exports = {
	getMessages: getMessages,
	sendMessage: sendMessage
	
};