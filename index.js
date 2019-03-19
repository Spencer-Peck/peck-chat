const express = require("express");
const socketIO = require('socket.io');
const path = require("path");
var appDir = path.dirname(require.main.filename);
require('dotenv').config();

const conversationController = require("./controllers/conversationController.js");
const messageController = require("./controllers/messageController.js");

const PORT = process.env.PORT || 5000;

var app = express();


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({extended: true})); // support url encoded bodies

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	//res.write("Hello world");
	res.render('chat_portal');
});

app.get("/conversations", conversationController.getConversations);
app.get("/messages", messageController.getMessages);
app.get("/conversationNames", conversationController.getConversationNames);

// start the server listening
server = app.listen(PORT, function() {
  console.log('Node app is running on porty', PORT);
});


const io = socketIO(server);

io.on('connection', (socket) => {
	console.log('New user connected');
});
io.on('connect_failed', function(){
    console.log('Connection Failed');
});

//Server connections

