// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15


// Main API URL
var wordnik = 'http://api.wordnik.com/v4/word.json/';
// API Key
var api_key = '/?api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7'


var words = ['rainbow', 'heart', 'sparkle', 'canteen', 'ridiculous'];

function setup() {
  noCanvas();

  for (var i = 0; i < words.length; i++) {
    var a = createA('#', words[i]);
    a.class('box');
    wordnikIt(a, words[i]);

    // Just putting a space
    createSpan(' ');
  }
}

function wordnikIt(elt, word) {

  elt.mousePressed(queryWordnik);

  var interval;

  function queryWordnik() {
    interval = animate(elt);
    loadJSON(wordnik + word + '/relatedWords' + api_key, gotData);
  }

  function gotData(data) {
    var r1 = floor(random(data.length));
    var r2 = floor(random(data[r1].words.length));
    elt.html(data[r1].words[r2]);
    clearInterval(interval);
  }
}


function animate(elt) {

  var count = 0;
  function increment() {
    count = (count + 1) % 100;
    elt.html(count);
  }
  return setInterval(increment, 25);
}


