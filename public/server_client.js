

var PORT;
function setup(){
	getConversations();
}


function addConversation(conversation){
	console.log(conversation);
	if (conversation.avatar_url == null)
	{
		conversation.avatar_url = "https://connect.protel.net/files/Source/demodashboard/dist/img/def_face.jpg";
		console.log("avatar is null");
	}
	//var dateFormat = require('dateformat');
	//var date = dateFormat(conversation.created_at, "mmmm, dddd");
	date = "";

	$("#inbox_chat").append('<div class="chat_list"><div class="chat_people"><div class="chat_img"> <img src="'+conversation.avatar_url+'" alt=""> </div><div class="chat_ib"><h5>'+conversation.first_name+ " " + conversation.last_name+'<span class="chat_date">'+date+'</span></h5><p>'+conversation.content+'</p></div></div></div>');
}

function getConversations(){
	$.get('/conversations?id=9', function(data) {

		//for (var i = 0; i < data.list.length; i++){
		//	addConversation(data.list[i]);
		//}

		//$.each(data, function(i, item) {
			//addConversation(item);
		//});
		for (i in data){
			addConversation(data[i]);
		}

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

