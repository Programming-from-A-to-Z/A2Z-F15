var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
};

// Here's how we can write code to handle a specific 'route'
// http://myserver.com/thing/dan/5
app.get('/thing/:name/:num', doThing);

// This is the call back for what to do
// We can get stuff from url path
// http://myserver.com/thing/name/id
function doThing(req, res) {
  // Query String
  var name = req.params['name'];
  var num = req.params['num'] || 1;
  var output = '';
  for (var i = 0; i < num; i++) {
    output += "Thanks for doing your thing, " + name + '<br/>';
  }
  res.send(output);
}