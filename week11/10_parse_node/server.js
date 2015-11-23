// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

var Parse = require('parse/node').Parse;

Parse.initialize("63MFKUwjDE4syXL3vr3hFJw6Ic5brmF7VfHbJgti", "P9eoSLPUbdkVLr60iYHd58iD4Jje2fgrFXHiN5Oc");

loadAll();

function loadAll() {
  var Thesis = Parse.Object.extend("Thesis");

  // Start a query
  var query = new Parse.Query(Thesis);

  // Need a success and error callback
  var callbacks = {
    // success callback is more complex, moving out of here
    success: gotAll,
    // Just log the error if it doesn't work
    error: function(error) {
      console.log(error);
    }    
  }

  // find() is how to ask for everything
  query.find(callbacks);
}

// The data comes back as an array 
function gotAll(data) {
  // Look at the data in the console 

  // Loop through array
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].attributes.title);
  }
}
