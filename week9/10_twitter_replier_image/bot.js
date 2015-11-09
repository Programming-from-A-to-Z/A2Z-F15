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
var lwip = require('lwip');

console.log("image bot starting");
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

  console.log(reply_to + ' ' + name + ' ' + txt + ' ' + media);

  if (reply_to === 'a2zitp') {


    if (media === undefined) {
      var reply = '@' + name + ' I need an image to do something!';
      T.post('statuses/update', { status: reply }, tweeted);
      console.log("replying: " + reply);
    } else if (media.length > 0) {
      var img = media[0].media_url;
      console.log(img);
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
    lwip.open(filename, processImage)
  }

  function processImage(err, image) {
    //image.rotate(45);
    image.writeFile('output.jpg', tweetBack)
  }

  function tweetBack(err) {
    if (err) {
      console.log(err);
    }
    console.log('blurred!');

    var b64content = fs.readFileSync('output.jpg', { encoding: 'base64' });

    T.post('media/upload', { media_data: b64content }, uploaded);

    function uploaded(err, data, response) {

      // now we can reference the media and post a tweet (media will attach to the tweet)
      var mediaIdStr = data.media_id_string
      var params = { status: '#blurbod', media_ids: [mediaIdStr] }

      T.post('statuses/update', params, tweeted);

      function tweeted(err, data, response) {
        console.log(data)
      }
    };
  }

}
