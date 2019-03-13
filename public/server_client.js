
var PORT;
function setup(){
	$.get('/serverData', (data) => {
		PORT = data;
		console.log(data);
	});
}

$(function(){
	//make connection
	//var socket = io.();


	var socket = io.connect('https://tranquil-rocky-mountain-92476.herokuapp.com:' + PORT);

	socket.on("update_conversations", (data) => {
		//chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
		$.get('/conversations', (data) => {
			data.forEach(addMessages);
		});
	});


});

