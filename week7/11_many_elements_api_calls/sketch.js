// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Sign up for Wordnik here: https://www.wordnik.com/
// Developer documentation: http://developer.wordnik.com/

// Main API URL
var wordnik = 'http://api.wordnik.com/v4/word.json/';
// API Key
var command = '/frequency?startYear=1800&endYear=2015'
var api_key = '&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7'


// var words = ['rainbow', 'unicorn', 'heart'];

var lines;
function preload() {
  lines = loadStrings('prideprejudice.txt');
}

function setup() {
  noCanvas();

  var txt = lines.join('\n');
  var counts = new Concordance();
  counts.process(txt);

  var keys = counts.getKeys();
  console.log(keys);
  for (var i = 0; i < keys.length; i++) {
  //for (var i = 0; i < 50; i++) {
    var url = wordnik + keys[i] + command + api_key;
    delayQuery(url, i);
    // loadJSON(url, gotData);  
  }

  // for (var i = 0; i < words.length; i++) {
  //   var url = wordnik + words[i] + command + api_key;
  //   loadJSON(url, gotData);
  // }
}


function delayQuery(url, i) {
  setTimeout(runQuery, i * 10);
  function runQuery() {
    loadJSON(url, gotData);  
  }
}

function gotData(data) {
  createDiv(data.word + ': ' + data.totalCount);
}
