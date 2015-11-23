// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// http://norvig.com/spell-correct.html
// https://github.com/dwyl/english-words

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

var cors = require('cors');

var sentiment = require('sentiment');

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var fs = require('fs');
var additional;
var exists = fs.existsSync('additional.json');
if (exists) {
  console.log('loading additional words');
  var txt = fs.readFileSync('additional.json', 'utf8');
  additional = JSON.parse(txt);
} else {
  console.log('No additional words');
  additional = {};
}

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
app.use(cors());

// Here's how we can write code to handle a specific 'route'
// http://myserver.com/thing/dan/5
// This is the "RESTful" model, thing is the path, name and num are parameters
app.get('/add/:word/:score', addWord);

// This is the call back for what to do
// We can get stuff from url path
// http://myserver.com/spellcheck/word/
function addWord(req, res) {
  var word = req.params.word;
  var score = Number(req.params.score);

  // Put it in the object
  additional[word] = score;
  var reply = {
    status: 'success',
    word: word,
    score: score
  }
  console.log('adding: ' + JSON.stringify(reply));
  var json = JSON.stringify(additional, null, 2);
  fs.writeFile('additional.json', json, 'utf8', finished);
  function finished(err) {
    console.log('Finished writing additional.json');
    res.send(reply);    
  }
}

app.post('/analyze', analyze);

function analyze(req, res) {
  var text = req.body.text;
  var reply = sentiment(text, additional);
  res.send(reply);
}





