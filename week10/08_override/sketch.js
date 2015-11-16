// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Thank you to: https://github.com/dariusk/metaphor-a-minute/blob/master/metaphor.js

// Sign up for Wordnik here: https://www.wordnik.com/
// Developer documentation: http://developer.wordnik.com/

// Call to get a random noun

// A random word
var randomWordURL = "http://api.wordnik.com/v4/words.json/randomWord?" + 
                    "&minLength=5&maxLength=-1" + 
                    "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";

function setup() {
  noCanvas();
  wordnik('word', randomWordURL);
}


function wordnik(where, url) {
  loadJSON(url, wordLoaded);
  function wordLoaded(data) {
    var div = createDiv(data.word);
    div.parent(where);
  }
}


