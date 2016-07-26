var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('./models/user');

var app = express();
var mongoURI = "mongodb://localhost:27017/prime_example_passport";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('mongodb connection error', err);
});

MongoDB.once('open', function(){
  console.log('mongodb connection open');
});

app.use(session({
  secret: 'secret',  //never use this again!
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 60000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use('/', index);

app.use(express.static('public'));


// Katie -- start here on Tuesday with the passport.serializeUser(function(user, done))



// passport.use('local', newlocalStrategy({ passReqToCallback: true}, usernameField: 'username' }, function(request, username, password, done) {
//   //implementation will go here eventually
//   console.log('we will add a function');
// }
// ));



var server = app.listen(3000, handleServerStart);

function handleServerStart(){
  var port = server.address().port;
  console.log('Listening on port', port);
}
