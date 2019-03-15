

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
	var names = "";
	$.get('/conversationNames?user_id=9&conversation_id='+conversation.conversation_id+'&other_id='+conversation.id, function(data){


		for (i in data){
			names += ' ' + data[i].first_name + ",";
		}
		names = names.slice(0, -1);
		console.log(names);
		$("#inbox_chat").append('<div class="chat_list"><div class="chat_people"><div class="chat_img"> <img src="'+conversation.avatar_url+'" alt=""> </div><div class="chat_ib"><h5>'+conversation.first_name+ " " + conversation.last_name+',' + names +'<span class="chat_date">'+date+'</span></h5><p>'+conversation.content+'</p></div></div></div>');

	});

	//var dateFormat = require('dateformat');
	//var date = dateFormat(conversation.created_at, "mmmm, dddd");
	date = "";

	
}

function getConversations(){
	$.get('/conversations?id=9', function(data) {

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

