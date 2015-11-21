// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

var analyze    = require('Sentimental').analyze;
var positivity = require('Sentimental').positivity;
var negativity = require('Sentimental').negativity;

var s = "I am so happy right now."
console.log(negativity(s));


// Set up the server
// process.env.PORT is related to deploying on heroku
// var server = app.listen(process.env.PORT || 3000, listen);

// // This call back just tells us that the server has started
// function listen() {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log('Example app listening at http://' + host + ':' + port);
// }

// // Set the route for the root directory
// app.get('/', hello);

// // This is what happens when any user requests '/'
// function hello(req, res) {
//   // Just send back "Hello World!"
//   // Later we'll see how we might send back JSON
//   res.send('Hello World!');
// }
