$(function(){
	//make connection
	//var socket = io.();
	var socket = io.connect('https://tranquil-rocky-mountain-92476.herokuapp.com/');

	socket.on("update_conversations", (data) => {
		//chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
		$.get('/conversations', (data) => {
			data.forEach(addMessages);
		});
	});


});