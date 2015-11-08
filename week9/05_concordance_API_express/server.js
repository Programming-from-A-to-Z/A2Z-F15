// Daniel Shiffman
// Programming from A to Z, Fall 2014
// https://github.com/shiffman/Programming-from-A-to-Z-F14


// The 'fs' (file system) module allows us to read and write files
// http://nodejs.org/api/fs.html
var fs = require('fs');
// And we'll look at all files in the jane austen directory
var files = fs.readdirSync('austen');

var concordance = require('./concordance');

// Read the file as utf8 and process the data
// Notice how this is in a loop to parse all files
for (var i = 0; i  < files.length; i++) {
  fs.readFile('austen/'+files[i], 'utf8', processFile);
}

// How many files have been read?
var fileCount = 0;
// An object that acts as dictionary of words and counts
var wordcounts = new concordance.Concordance();

function processFile(err, data) {
  // If there's a problem
  if (err) {
    console.log('ooops, there was an error reading this file');
    throw err;
  }

  wordcounts.process(data);

  // This file finished
  fileCount++;

  // Is this the last file?
  if (fileCount === files.length) {
    wordcounts.sortByCount();
  }
}

var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
};

app.use(express.static('public'));

app.get('/all', showAll);

function showAll(req, res) {
  res.send(wordcounts);
}

app.get('/search/:word', showOne);

function showOne(req, res) {
  var word = req.params['word'];

  var reply = { };

  var count = wordcounts.getCount(word);

  if (count === undefined) {
    reply.status = 'word not found';
  } else {
    reply.status = 'success';
    reply.word = word;
    reply.count = count;
  }

  res.send(reply);
}




