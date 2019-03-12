  const { Pool } = require("pg");

  const connectionString = process.env.DATABASE_URL || "postgres://peckchatuser:teampeck@localhost:5432/PeckChat";
  const pool = new Pool({connectionString: connectionString});


function getConversationsFromDb(id, callback) {
	var sql = " SELECT conversations.id AS conversation_id, messages.user_id AS last_message_owner_id, auth_user.messages_read_at < messages.created_at AS has_unread_messages, messages.id, messages.content, messages.created_at,";
	sql += " messages.user_id = $1::int AS mine, other_users.id, other_users.first_name, other_users.avatar_url FROM conversations INNER JOIN messages ON conversations.last_message_id = messages.id";
	sql += " INNER JOIN participants other_participants ON other_participants.conversation_id = conversations.id AND other_participants.user_id != $1::int";
	sql += " INNER JOIN users other_users ON other_participants.user_id = other_users.id INNER JOIN participants auth_user ON auth_user.conversation_id = conversations.id";
	sql +=	" AND auth_user.user_id = $1::int ORDER BY messages.created_at DESC;";

	var params = [id];
	pool.query(sql, params, function(err, result) {

		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			pool.end();
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));
		pool.end();
		callback(null, result.rows);
	});
}


module.exports = {
	getConversationsFromDb: getConversationsFromDb
};