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

var request = require('request');


function downloadFile(url, filename) {
  console.log('Attemping to downlowd url: ' + url + ' to ' + filename);

  request.head(url, downloaded);

  function downloaded (err, res, body) {
    var type = res.headers['content-type'];
    console.log('content-type:', type);
    console.log('content-length:', res.headers['content-length']);

    var i = type.indexOf('/');
    var ext = type.substring(i+1, type.length);
    filename = filename + '.' + ext;

    request(url).pipe(fs.createWriteStream(filename)).on('close', filed);
  };

  function filed() {
    console.log(url + ' downloaded to ' + filename);
  }
}


stream.on('tweet', tweetEvent);


function tweeted(err, success) {
  if (err !== undefined) {
    console.log(err);
  } else {
    console.log('Tweeted: ' + JSON.stringify(success, null, 2));
  }
}

function tweetEvent(tweet) {

  var reply_to = tweet.in_reply_to_screen_name;
  var name = tweet.user.screen_name;
  var txt = tweet.text;
  var media = tweet.entities.media;

  if (reply_to === 'a2zitp') {

    var img;
    if (media.length > 0) {
      img = media[0].media_url;
      console.log(img);
    }

    if (media === undefined) {
      var reply = '@' + name + ' I need an image to do something!';
      T.post('statuses/update', { status: reply }, tweeted);
      console.log("replying: " + reply);
    } else {
      downloadFile(img, 'media');
    }

    // If we wanted to write a file out
    // var json = JSON.stringify(tweet,null,2);
    // fs.writeFile("tweet.json", json, output);

    // function output(err) {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log("file saved");
    // }; 
  }

}