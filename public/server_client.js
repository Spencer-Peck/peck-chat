

var PORT;
var user_id;
var conv_id;
function setup(){
	getConversations();
	//getMessages();
	getUserInfo();
}

//This is to add active class when a conversation is clicked
$(function() {                       //run when the DOM is ready
  $(".active_con").click(function() {  //use a class, since your ID gets mangled
    $(this).addClass("active_chat");      //add the class to the clicked element
  });
});

function getUserInfo(){
	$.get('/userInfo', function(data) {
		//user_id = data.id;
		$("#header_name").html('<div class="header_img"> <img src="'+data.avatar_url+'" alt=""> </div>');
		console.log(data);

	});

}


function addConversation(conversation, i, update){
	console.log(conversation);
	if (conversation.avatar_url == null)
	{
		conversation.avatar_url = "https://connect.protel.net/files/Source/demodashboard/dist/img/def_face.jpg";
		console.log("avatar is null");
	}
	date = conversation._date;
	
	//$("#inbox_chat").append('<div class="chat_list" id="'+conversation.conversation_id+'" onclick="getMessages('+conversation.conversation_id+')"><div class="chat_people"><div class="chat_img"> <img src="'+conversation.avatar_url+'" alt=""> </div><div class="chat_ib"><h5>'+conversation.first_name+ " " + conversation.last_name+'<span class="chat_date">'+date+'</span></h5><p>'+conversation.content+'</p></div></div></div>');

	var conHTML = '<div class="chat_list" id="'+conversation.conversation_id+'" onclick="getMessages('+conversation.conversation_id+')"><div class="chat_people"><div class="chat_img"> <img src="'+conversation.avatar_url+'" alt=""> </div><div class="chat_ib"><h5>'+conversation.first_name+ " " + conversation.last_name+'<span class="chat_date">'+date+'</span></h5><p>'+conversation.content+'</p></div></div></div>'
	if (i == 0 && !update)
	{
		//getMessages(conversation.conversation_id);
		conv_id = conversation.conversation_id;
	}
	return conHTML;

}

function getConversations(update){
	//var user_id = <%- user.id %>;
	$.get('/conversations', function(data) {
		var conHTML = "";

		for (i in data){
			conHTML += addConversation(data[i], i, update);
		}
		$("#inbox_chat").html(conHTML);
		getMessages(conv_id);

	});
}


function addMessage(message){
	if (message.avatar_url == null)
	{
		message.avatar_url = "https://connect.protel.net/files/Source/demodashboard/dist/img/def_face.jpg";
	}
	var messageHTML;
	//var time = "11:01 AM    |    June 9";
	var time = message._date;

	if (!message.mine){
		messageHTML = '<div class="incoming_msg"><div class="incoming_msg_img"><img src="'+message.avatar_url+'" alt="Spencer"></div>';
        messageHTML += '<div class="received_msg"><div class="received_withd_msg"><span class="time_date">'+message.first_name+'</span><p>'+message.content+'</p>';
        messageHTML += '<span class="time_date">'+time+'</span></div></div></div>';
    }
    else {
    	messageHTML = '<div class="outgoing_msg"><div class="sent_msg"><p>'+message.content+'</p><span class="time_date">'+time+'</span> </div></div>';
    }

    return messageHTML;


	//$("#msg_history").append(messageHTML);


}


function getMessages(conversation_id){
	$.get('/messages?con_id='+conversation_id, function(data) {

		var messageHTML = "";

		for (i in data){
			messageHTML += addMessage(data[i]);
		}
		$("#msg_history").html(messageHTML);
		let active = document.getElementsByClassName("active_chat");
		if (active[0] != null)
			active[0].classList.remove("active_chat");
		document.getElementById(conversation_id).classList.add("active_chat");
		document.getElementById("send_con").value = conversation_id;
		$("#msg_history").scrollTop($("#msg_history")[0].scrollHeight);


	});

}


$(function(){
	//make connection
	//var socket = io.();
	var send_message = $("#send_message");

	send_message.click(function(){
	console.log("was clicked");
	var message = $("#message");
	var id = $("#send_con");
	conv_id = id.val();
	var data = {
		con_id: id.val(),
		content: message.val()

	};
	$.post('/messages', data, function(data) {
		getConversations(true);

	});

});



	var socket = io();
	socket.connect('https://tranquil-rocky-mountain-92476.herokuapp.com/', { autoConnect: true});

	//var socket = io.connect('https://tranquil-rocky-mountain-92476.herokuapp.com:' + PORT);

	socket.on("update_conversations", (data) => {
		//chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
		$.get('/conversations', (data) => {
			data.each(addMessages);
		});
	});


});

