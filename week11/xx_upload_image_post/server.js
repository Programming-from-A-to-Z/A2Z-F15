// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010
// https://www.npmjs.com/package/sentiment

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// File System for loading the list of words
var fs = require('fs');

// "body parser" is need to deal with post requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// This is for hosting files
app.use(express.static('public'));

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// Now here we take a POST request
// This is to analyze a larger body of text
app.post('/image', upload);

function upload(req, res) {
  // The bodyParse package allows us to easily just grab the "text" field
  // var text = req.body.text;
  // // Send back the results of the analysis
  // // Use the additional words too
  // var reply = sentiment(text, additional);
  res.send(reply);
}





