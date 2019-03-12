
  const express = require('express');
  const path = require('path');

  const conversationController = require("./controllers/conversationController.js");

  const app = express();


  const { Pool } = require("pg");

  const connectionString = process.env.DATABASE_URL || "postgres://peckchatuser:teampeck@localhost:5432/PeckChat";


  const port = process.env.PORT || 5000;

  app.use(express.static(__dirname + '/public'));
  app.use(express.json);
  app.use(express.urlencoded({extended: true}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/conversations', function(request, response) {
	conversationController.getConversations(request, response);
});

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});



