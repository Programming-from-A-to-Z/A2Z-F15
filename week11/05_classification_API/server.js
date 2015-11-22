// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// http://norvig.com/spell-correct.html
// https://github.com/dwyl/english-words

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var natural = require('natural');

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

//natural.BayesClassifier.load('classifier.json', null, loaded);

var fs = require('fs');
var exists = fs.existsSync('classifier.json');
if (exists) {
  natural.BayesClassifier.load('classifier.json', null, loaded);
} else {
  console.log('starting a new classifier');
  classifier = new natural.BayesClassifier();  
}

function loaded(err, cf) {
  classifier = cf;
  console.log('Classifier loaded');
}

// This is for hosting files
// Anything in the public directory will be served
// This is just like python -m SimpleHTTPServer
// We could also add routes, but aren't doing so here
app.use(express.static('public'));


app.post('/train', training);

function training(req, res) {
  console.log(req.body);
  var text = req.body.text;
  var category = req.body.category;
  classifier.addDocument(text, category);
  classifier.train();
  res.send(req.body);
  classifier.save('classifier.json', saved);

  function saved(err, classifier) {
    console.log('finished training and saving');
  }
}

app.post('/classify', classify);

function classify(req, res) {
  var text = req.body.text;
  var classification = classifier.classify(text);
  var all = classifier.getClassifications(text);

  var reply = {
    category: classification,
    classifications: all
  }
  res.send(reply);
}



// classifier.addDocument('i am long qqqq', 'buy');
// classifier.addDocument('buy the q\'s', 'buy');
// classifier.addDocument('short gold', 'sell');
// classifier.addDocument('sell gold', 'sell');

// classifier.train();


