// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Sign up for Wordnik here: https://www.wordnik.com/
// Developer documentation: http://developer.wordnik.com/

// Main API URL
var wordnik = 'http://api.wordnik.com/v4/word.json/';
// API Key
var api_key = '/?api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7'

// Get user input
var input;

// Storing all possible API calls in an array
var apiCalls = ['examples', 'definitions', 'relatedWords', 'pronunciations', 'hyphenation',
  'frequency', 'phrases', 'etymologies', 'audio'
];

function setup() {
  noCanvas();

  // Get the input from user
  input = select('#word');  

  // This is a loop that creates buttons for each apiCall
  // in the above array
  for (var i = 0; i < apiCalls.length; i++) {
    var button = createButton(apiCalls[i]);
    button.parent('buttons');
    // Here a function is called to attach a callback
    // to each button
    setQuery(button, apiCalls[i]);
  }
}


// This is a complex closure with two functions inside this one
// The idea is to attach a callback for queries run on wordnik
function setQuery(button, what) {
  button.mousePressed(runQuery);

  // Here the URL is made and loadJSON is triggered
  function runQuery() {
    var url = wordnik + input.value() + '/' + what + api_key;
    loadJSON(url, gotData);
  }

  // This is a function to handle when the data has come back
  function gotData(data) {
    console.log(data);
    
    // Render everything as an "ordered list"
    var ol = createElement('ol');

    // Which API call did I run?
    if (what == 'examples') {
      for (var i = 0; i < data.examples.length; i++) {
        // Get example text
        var li = createElement('li', data.examples[i].text);
        li.parent(ol);
      }
    } else if (what == 'definitions') {
      for (var i = 0; i < data.length; i++) {
        // Part of speech and definitions
        var li = createElement('li', data[i].partOfSpeech + ': ' + data[i].text);
        li.parent(ol);
      }
    } else if (what == 'relatedWords') {
      for (var i = 0; i < data.length; i++) {
        var words = data[i].words.join(', ');
        // Relationship type and word
        var li = createElement('li', data[i].relationshipType + ': ' + words);
        li.parent(ol);
      }
    } else if (what == 'audio') {
      for (var i = 0; i < data.length; i++) {
        // Make a link that plays the sound
        var a = createA('#', 'play');
        // Attach a sound to the link
        setSound(a, data[i].fileUrl);
        var li = createElement('li', data[i].audioType + ': ');
        a.parent(li);
        li.parent(ol);
      }
    } else {
      // I'm not handling all of the API calls
      var li = createElement('li', "take a look in the console at the data");
      li.parent(ol);
    }
  }
}

// Closure to attach a sond to a link press
function setSound(a, url) {
  a.mousePressed(playSound);
  function playSound() {
    var audio = createAudio(url);
    audio.play();
  }
}
