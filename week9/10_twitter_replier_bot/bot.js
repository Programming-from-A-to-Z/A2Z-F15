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

var fs = require('fs');

var stream = T.stream('user');

stream.on('follow', followed);

function followed(event) {
  var name = event.source.name;
  var screenName = event.source.screen_name;
  console.log('I was followed by: ' + name + ' ' + screenName);
}

stream.on('tweet', tweetEvent);

function tweetEvent(tweet) {

  // If we wanted to write a file out
  // var json = JSON.stringify(tweet,null,2);
  // fs.writeFile("tweet.json", json, output);

  // function output(err) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log("file saved");
  // }; 

  var reply_to = tweet.in_reply_to_screen_name;
  var name = tweet.user.screen_name;
  var txt = tweet.text;

  if (reply_to === 'a2zitp') {

    txt = txt.replace(/@a2zitp/g,'');

    var reply = '.@'+name + ' ';
    for (var i = txt.length-1; i >= 0; i--) {
      reply += txt.charAt(i);
    }
  
    // Post that tweet!
    T.post('statuses/update', { status: reply }, tweeted);

    console.log("replying: " + reply);

    function tweeted(err, reply) {
      if (err !== undefined) {
        console.log(err);
      } else {
        console.log('Tweeted: ' + reply);
      }
    };
  }

}