  const { Pool } = require("pg");

  const connectionString = process.env.DATABASE_URL || "postgres://peckchatuser:teampeck@localhost:5432/PeckChat";
  const pool = new Pool({connectionString: connectionString});


  function getMessagesFromDb(id, con_id, callback) {
	var sql = "SELECT DISTINCT messages.user_id = $1::int AS mine, users.first_name, messages.created_at, messages.content, users.avatar_url, CONCAT(to_char(messages.created_at, 'FMHH12:MI AM'), ' | ', to_char(messages.created_at, 'DD Mon')) AS _date FROM conversations";
    sql += " INNER JOIN participants ON participants.conversation_id = conversations.id AND conversations.id = $2::int INNER JOIN users ON users.id = participants.user_id";
	sql += " INNER JOIN messages ON messages.user_id = users.id AND messages.conversation_id = conversations.id ORDER BY messages.created_at;";
	var params = [id, con_id];
	pool.query(sql, params, function(err, result) {

		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			//pool.end();
			callback(err, null);
		}

		//console.log("Found result: " + JSON.stringify(result.rows));
		//pool.end();
		callback(null, result.rows);
	});
}

module.exports = {
	getMessagesFromDb: getMessagesFromDb
};