

var PORT;
function setup(){
	getConversations();
}


function addConversation(conversation){
	console.log("made it here");
	if (conversation.avatar_url == null)
	{
		conversation.avatar_url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
		console.log("avatar is null");
	}
	//var dateFormat = require('dateformat');
	//var date = dateFormat(conversation.created_at, "mmmm, dddd");
	date = "";

	$("#inbox_chat").append('<div class="chat_list"><div class="chat_people"><div class="chat_img"> <img src="'+conversation.avatar_url+'" alt=""> </div><div class="chat_ib"><h5>'+conversation.first_name+'<span class="chat_date">'+date+'</span></h5><p>'+conversation.content+'</p></div></div></div>');
}

function getConversations(){
	$.get('/conversations?id=9', function(data) {

		//for (var i = 0; i < data.list.length; i++){
		//	addConversation(data.list[i]);
		//}

		$.each(data, function(i, item) {
			addConversation(item);
		});
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
			data.each(addMessages);
		});
	});


});

