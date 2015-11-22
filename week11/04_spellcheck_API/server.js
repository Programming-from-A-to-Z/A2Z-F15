// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// http://norvig.com/spell-correct.html
// https://github.com/dwyl/english-words

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

var natural = require('natural');
var Spellcheck = natural.Spellcheck;


var fs = require('fs');

//var words = fs.readFileSync('data/words_less.txt', 'utf8');
var words = fs.readFileSync('data/words.txt', 'utf8');
var corpus = words.split(/\n/);

var spellcheck = new Spellcheck(corpus);

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// This is for hosting files
// Anything in the public directory will be served
// This is just like python -m SimpleHTTPServer
// We could also add routes, but aren't doing so here
app.use(express.static('public'));

// Here's how we can write code to handle a specific 'route'
// http://myserver.com/thing/dan/5
// This is the "RESTful" model, thing is the path, name and num are parameters
app.get('/spellcheck/:word/:maxdistance', spellCheck);
app.get('/spellcheck/:word', spellCheck);


// This is the call back for what to do
// We can get stuff from url path
// http://myserver.com/spellcheck/word/
function spellCheck(req, res) {
  // Query String
  var word = req.params['word'];
  var maxdistance = req.params['maxdistance'] || 1;

  // The spellchecker seems to hang over 2
  // Probably b/c the wordlist at 350,000 words in it
  if (maxdistance > 2) {
    maxdistance = 2;
  }

  console.log('checking ' + word);

  var correct = spellcheck.isCorrect(word);
  if (correct) {
    var reply = {
      status: 'correct'
    }
    res.send(reply);
  }


  var corrections = spellcheck.getCorrections(word, maxdistance); 
  //console.log(corrections);
  var reply = {
    status: 'incorrect',
    maxdistance: maxdistance,
    suggestions: corrections
  }
  res.send(reply);
}