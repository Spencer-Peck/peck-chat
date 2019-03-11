
  const express = require('express');
  const app = express();


  const { Pool } = require("pg");

  const connectionString = process.env.DATABASE_URL || "postgres://peckchatuser:teampeck@localhost:5432/PeckChat";
  const pool = new Pool({connectionString: connectionString});


  const port = process.env.PORT || 5000;

  app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getConversations', function(request, response) {
	getConversations(request, response);
});

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});

function getPerson(request, response) {
	var id = request.query.id;


	getConversationsFromDb(id, function(error, result) {

		var conversations = result;
	    response.status(200).json(result);


	});
};

function getPersonFromDb(id, callback) {
	var sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";
	var sql = "SSELECT conversations.id, auth_user.messages_read_at < messages.created_at AS has_unread_messages, messages.id, messages.content, messages.created_at,";
	sql += "messages.user_id = 7 AS mine, other_users.id, other_users.first_name, other_users.avatar_url FROM conversations INNER JOIN messages ON conversations.last_message_id = messages.id";
	sql += "INNER JOIN participants other_participants ON other_participants.conversation_id = conversations.id AND other_participants.user_id != $1::int";
	sql += "INNER JOIN users other_users ON other_participants.user_id = other_users.id INNER JOIN participants auth_user ON auth_user.conversation_id = conversations.id";
	sql +=	"AND auth_user.user_id = $1::int ORDER BY messages.created_at DESC;";

	var params = [id];

	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	}

