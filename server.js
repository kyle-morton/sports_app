// BASE SETUP
// ======================================

//GET CONFIG FILE
var config = require('./config');


// CALL THE PACKAGES --------------------
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var morgan     = require('morgan'); 		// used to see requests
var mongoose   = require('mongoose');
var port       = config.port;

// APP CONFIGURATION ---------------------

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser({limit: '5mb'})); //set large size limit for files
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to the console 
app.use(morgan('dev'));

//connect to our database
mongoose.connect(config.database);


// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// basic route for the home page
app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});

app.listen(port);
console.log("App ready on port: " + port);