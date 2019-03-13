$(function(){
	//make connection
	//var socket = io.();
	const PORT = process.env.PORT || 5000;
	var socket = io.connect('https://lit-woodland-79911.herokuapp.com:' + PORT);

	socket.on("update_conversations", (data) => {
		//chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
		$.get('/conversations', (data) => {
			data.forEach(addMessages);
		});
	});


});