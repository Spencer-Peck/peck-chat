const express = require("express");
const path = require("path");
require('dotenv').config();

const conversationController = require("./controllers/conversationController.js");

const PORT = process.env.PORT || 5000;

var app = express();


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({extended: true})); // support url encoded bodies

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/conversations", conversationController.getConversations);

// start the server listening
server = app.listen(PORT, function() {
  console.log('Node app is running on porty', PORT);
});

const io = require("socket.io")(server);

io.on('connection', (socket) => {
	console.log('New user connected');
});

//Server connections

