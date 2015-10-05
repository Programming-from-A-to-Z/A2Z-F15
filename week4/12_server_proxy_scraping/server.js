// Daniel Shiffman
// Programming from A to Z, Fall 2014
// https://github.com/shiffman/Programming-from-A-to-Z-F14

// Thanks Sam Lavigne and Shawn Van Every
// https://github.com/antiboredom/servi.js/wiki

// Use servi
// npm install servi
var servi = require('servi');
// Make an app
var app = new servi(true);

var http = require('http');


// Set the port
port(8080);

// This is basically just like 'python -m SimpleHTTPServer'
// We are just serving up a directory of files
serveFiles("public");

route('/load', loadURL);

// Callback
function loadURL(request) {
  // Here's the string we are seraching for
  var url = request.params.url;
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
      request.respond(str);
    });
  }


}

console.log("scraping proxy starting");
start();