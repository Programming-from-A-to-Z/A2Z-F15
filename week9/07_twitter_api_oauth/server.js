// Daniel Shiffman
// Programming from A to Z, Fall 2014
// https://github.com/shiffman/Programming-from-A-to-Z-F14

// Thanks Sam Lavigne and Shawn Van Every
// https://github.com/antiboredom/servi.js/wiki

var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
  console.log("Twitter API server");
};

// This is basically just like 'python -m SimpleHTTPServer'
// We are just serving up a directory of files
app.use(express.static('public'));

// Create an Twitter object to connect to Twitter API
// npm install twit
var Twit = require('twit');

// Pulling all my twitter account info from another file
var config = require('./config.js');
// Making a Twit object for connection to the API
var T = new Twit(config);

// This is how I would do it manually, if I were doing it manually
// var T = new Twit({
//   consumer_key:         '', 
//   consumer_secret:      '',
//   access_token:         '',
//   access_token_secret:  ''
// });

// This route searches twitter
app.get('/tweets/:query', getTweets);

// Callback
function getTweets(req, res) {
  // Here's the string we are seraching for
  var query = req.params.query;

  // Execute a Twitter API call
  T.get('search/tweets', { q: query, count: 10 }, gotData);

  function gotData(err, data) {
    // Get some data
    var tweets = data.statuses;

    // Spit it back out so that p5 can load it!
    res.send(tweets);
  };
}

// This is a route for posting a tweet
app.get('/tweet', postTweet);

function postTweet(req, res) {
  // What did we ask to tweet?
  var statement = req.query.status;

  // Post that tweet!
  T.post('statuses/update', { status: statement }, tweeted);

  function tweeted(err, reply) {
    // If there was an error let's respond with that error
    if (err !== null) {
      res.send(err);
    // Otherwise let's respond back that it worked ok!
    } else {
      res.send(reply);
    }
  };
}

// If you don't specify a query let's return an error
app.get('/tweets', error);

// Sending back an error
function error(req, res) {
  var error = {
    error: 'you forgot to specify a query'
  };
  res.send(error);
}