const express = require("express");
const socketIO = require('socket.io');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var User = require('./models/user');
const path = require("path");
var appDir = path.dirname(require.main.filename);
require('dotenv').config();

const conversationController = require("./controllers/conversationController.js");
const messageController = require("./controllers/messageController.js");

const PORT = process.env.PORT || 5000;

var app = express();


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support url encoded bodies
app.use(morgan('dev'));
app.use(cookieParser());

app.use(session({
    key: 'user_sid',
    secret: 'MyleeIsMyWife',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

function authenticate(req, res, next)  {
    if (req.session.user && req.cookies.user_sid) {
        return next();
    } else {
        res.redirect('/login');
    }    
};

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/signup.html');
    })
    .post((req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            //res.locals.user = user;
            res.redirect('/dashboard');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });

    app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                //res.locals.user = user;
                res.redirect('/dashboard');
            }
        });
    });

app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
    	//res.locals.user = 
        res.render('chat_portal');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});


app.get("/conversations", authenticate, function(req, res){
	//conversationController.getConversations;
	console.log("authenticated");
}); 
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

