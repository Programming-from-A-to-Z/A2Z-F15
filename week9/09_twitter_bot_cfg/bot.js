// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// There's no web server here!
// This is just a node app that connects to twitter and does stuff

// Using the Twit node package
// https://github.com/ttezel/twit
var Twit = require('twit');

// Pulling all my twitter account info from another file
var config = require('./config.js');

// Making a Twit object for connection to the API
var T = new Twit(config);

var cfg = require('./cf');

// Putting together a context free grammar to make tweets
var cfree = new cfg.ContextFree();
cfree.addRule('S', ['TOPIC', 'THING', 'with', 'TECH']);

// Thing can expand to join with another topic
cfree.addRule('THING', ['TOPIC', 'THING', 'with', 'TECH']);

// Tech can expand to be multiple technologies
cfree.addRule('TECH', ['TECH', 'and', 'TECH']);
cfree.addRule('TECH', ['TECH', 'and', 'TECH', 'plus', 'TECH']);

// TOPICS
cfree.addRule('TOPIC', ['Climate Change']);
cfree.addRule('TOPIC', ['Poetry']);
cfree.addRule('TOPIC', ['Music Box']);

// THINGS
cfree.addRule('THING', ['App']);
cfree.addRule('THING', ['Sculpture']);
cfree.addRule('THING', ['Wearable']);

// TECHS
cfree.addRule('TECH', ['JavaScript']);
cfree.addRule('TECH', ['Arduino']);
cfree.addRule('TECH', ['Oculus Rift']);
cfree.addRule('TECH', ['Makerbot']);
cfree.addRule('TECH', ['Cardboard']);
cfree.addRule('TECH', ['Pencil']);
cfree.addRule('TECH', ['Processing']);
cfree.addRule('TECH', ['Python']);

// Start once
tweeter();

// Once every N milliseconds
setInterval(tweeter, 60*5*1000);

// Here is the bot!
function tweeter() {

  // This is a random number bot
  var tweet = cfree.getExpansion('S');
  
  // Post that tweet!
  T.post('statuses/update', { status: tweet }, tweeted);

  // Callback for when the tweet is sent
  function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success: ' + data.text);
      //console.log(response);
    }
  };
}
