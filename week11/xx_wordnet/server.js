// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// https://github.com/NaturalNode/natural
// https://wordnet.princeton.edu/

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// File System for loading the list of words
var fs = require('fs');

// Using node natural
var natural = require('natural');

var WNdb = require('WNdb');
console.log(WNdb);

var wordnet = new natural.WordNet();

wordnet.lookup('apple', gotData);

var fs = require('fs');

function gotData(data) {
  var json = JSON.stringify(data,null,2);
  fs.writeFile("apple.json", json);
}