// Create an Twitter object to connect to Twitter API
// npm install twit
var Twit = require('twit');

var T = new Twit({
  consumer_key:         'bBp7yRjjICxeNsknpwvms4lSa', 
  consumer_secret:      'aQ4hry8nS0zh2puj2PSLsNljmK3sRqdRRnn8NxFF0p7rSXbLx9',
  access_token:         '2799041194-VQaiuOUCk6Z8Wwk0ZMDUwtg1njc4WCzRkb2MueC',
  access_token_secret:  'APGaYOHs9RDkThiizzWPpC1aGYsj123R4w1to9AqcivTL'
});


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