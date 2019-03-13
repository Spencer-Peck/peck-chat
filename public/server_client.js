
var PORT;
function setup(){
	getConversations();
}

function addConversationtion(conversation){
   $("#chat_list").append('<div class="chat_people"><div class="chat_img"> <img src="'+conversation.avatar_url+'" alt="Spencer"> </div><h5>'+conversation.first_name+'<span class="chat_date"></span></h5><p>'+conversation.content+'</p></div></div>');
   }

function getConversations(){
	$.get('/conversations?id=9', (data) => {
		data.forEach(addConversation);
	});
}


$(function(){
	//make connection
	//var socket = io.();

	var socket = io();
	socket.connect('https://tranquil-rocky-mountain-92476.herokuapp.com/', { autoConnect: true});

	//var socket = io.connect('https://tranquil-rocky-mountain-92476.herokuapp.com:' + PORT);

	socket.on("update_conversations", (data) => {
		//chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
		$.get('/conversations?id=9', (data) => {
			data.forEach(addMessages);
		});
	});


});

