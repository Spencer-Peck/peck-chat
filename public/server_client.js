

var PORT;
function setup(){
	getConversations();
}

function addConversation(conversation){
	console.log("made it here");
	if (conversation.avatar_url == null)
	{
		conversation.avatar_url = "https://ptetutorials.com/images/user-profile.png";
		console.log("avatar is null");
	}
   $("#inbox_chat").append('<div class="chat_list"><div class="chat_people"><div class="chat_img"> <img src="'+conversation.avatar_url+'" alt=""> </div><div class="chat_ib"><h5>'+conversation.first_name+'<span class="chat_date">Dec 25</span></h5><p>'+conversation.content+'</p></div></div></div>');
   }

function getConversations(){
	$.getJSON('/conversations?id=9', function(data) {

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

