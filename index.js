
  const express = require('express');
  const path = require("path");
  require('dotenv').config();

  

  const conversationController = require("./controllers/conversationController.js");

  var app = express();


  const port = process.env.PORT || 5000;

  app.use(express.static(__dirname + '/public'));
  app.use(express.json);
  app.use(express.urlencoded({extended: true}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/conversations", conversationController.getConversations);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});



