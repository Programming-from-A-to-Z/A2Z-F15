// Daniel Shiffman
// Programming from A to Z, Fall 2014
// https://github.com/shiffman/Programming-from-A-to-Z-F14

// Thanks Sam Lavigne and Shawn Van Every
// https://github.com/antiboredom/servi.js/wiki


var http = require('http');

var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
  console.log("scraping proxy starting");
};

// This is basically just like 'python -m SimpleHTTPServer'
// We are just serving up a directory of files
app.use(express.static('public'));

app.get('/load', loadURL);

// Callback
function loadURL(req, res) {
  // Here's the string we are seraching for
  var url = req.query.url;
  var regex = /https?:\/\/([^\s\/]+)(.*)/;
  var matches = url.match(regex);

  var ahost = matches[1];
  var apath = '/';
  if (matches[2]) {
    apath = matches[2];
  }

  var options = {
    host: ahost,
    path: apath
  };

  // This makes the request
  http.request(options, loaded).end();

  function loaded(response) {
    var str = '';

    // Some more data has come in
    response.on('data', function (chunk) {
      str += chunk;
    });

    // The request is finished
    response.on('end', function () {
      //console.log('Got soemtjing: ' + str);
      res.send(str);
    });
  }


}

