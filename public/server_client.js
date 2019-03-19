

var PORT;
function setup(){
	getConversations();
	getMessages();
}


function addConversation(conversation){
	console.log(conversation);
	if (conversation.avatar_url == null)
	{
		conversation.avatar_url = "https://connect.protel.net/files/Source/demodashboard/dist/img/def_face.jpg";
		console.log("avatar is null");
	}
	date = "";
	
	$("#inbox_chat").append('<div class="chat_list"><div class="chat_people"><div class="chat_img"> <img src="'+conversation.avatar_url+'" alt=""> </div><div class="chat_ib"><h5>'+conversation.first_name+ " " + conversation.last_name+'<span class="chat_date">'+date+'</span></h5><p>'+conversation.content+'</p></div></div></div>');


}

function getConversations(){
	$.get('/conversations?id=9', function(data) {

		for (i in data){
			addConversation(data[i]);
		}

	});
}


function addMessage(message){
	if (message.avatar_url == null)
	{
		message.avatar_url = "https://connect.protel.net/files/Source/demodashboard/dist/img/def_face.jpg";
	}
	var messageHTML;
	var time = "11:01 AM    |    June 9";

	if (!message.mine){
		messageHTML = '<div class="incoming_msg"><div class="incoming_msg_img"><img src="'+message.avatar_url+'" alt="Spencer"></div>';
        messageHTML += '<div class="received_msg"><div class="received_withd_msg"><span class="time_date">'+message.first_name+'</span><p>'+message.content+'</p>';
        messageHTML += '<span class="time_date">'+time+'</span></div></div></div>';
    }
    else {
    	messageHTML = '<div class="outgoing_msg"><div class="sent_msg"><p>'+message.content+'</p><span class="time_date">'+time+'</span> </div></div>';
    }


	$("#msg_history").append(messageHTML);


}


function getMessages(conversation_id){
	$.get('/messages?id=9&con_id='+4, function(data) {

		for (i in data){
			addMessage(data[i]);
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

