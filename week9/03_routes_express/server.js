var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
};

// Here's how we can write code to handle a specific 'route'
// http://myserver.com/thing
app.get('/thing', doThing);

// This is the call back for what to do
// We can get stuff from the query String!
// http://myserver.com/thing?name=Dan
function doThing(req, res) {
  // Query String
  var name = req.query['name'];
  res.send("Thanks for doing your thing, " + name);

  // This is also valid:
  // var name = request.query.name;
};