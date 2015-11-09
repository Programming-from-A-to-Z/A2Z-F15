// Create an Twitter object to connect to Twitter API
// npm install twit
var Twit = require('twit');

// Pulling all my twitter account info from another file
var config = require('./config.js');
// Making a Twit object for connection to the API
var T = new Twit(config);

var count = 35;

// Start once
tweeter();

// Once every N milliseconds
setInterval(tweeter, 60*5*1000);

function tweeter() {

  var tweet = 'I am a counting bot: ' + count;
  count++;
  
  // Post that tweet!
  T.post('statuses/update', { status: tweet }, tweeted);

  function tweeted(err, reply) {
    if (err !== undefined) {
      console.log(err);
    } else {
      console.log('Tweeted: ' + tweet);
    }
  };

}