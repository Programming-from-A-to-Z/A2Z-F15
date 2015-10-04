// Daniel Shiffman
// Programming from A to Z, Fall 2014
// https://github.com/shiffman/Programming-from-A-to-Z-F14

// Thank you to: https://github.com/dariusk/metaphor-a-minute/blob/master/metaphor.js

// Sign up for Wordnik here: https://www.wordnik.com/
// Developer documentation: http://developer.wordnik.com/

// Call to get a random noun
var wordnik = 'http://api.wordnik.com/v4/word.json/';
var api_key = '/?api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7'

var input;

var apiCalls = ['examples', 'definitions', 'relatedWords', 'pronunciations', 'hyphenation',
  'frequency', 'phrases', 'etymologies', 'audio'
];

function setup() {
  noCanvas();

  input = select('#word');

  for (var i = 0; i < apiCalls.length; i++) {
    var button = createButton(apiCalls[i]);
    button.parent('buttons');
    setQuery(button, apiCalls[i]);
  }
}


function setSound(a, url) {
  a.mousePressed(playSound);
  function playSound() {
    var audio = createAudio(url);
    audio.play();
  }
}



function setQuery(button, what) {
  button.mousePressed(runQuery);

  function runQuery() {
    var url = wordnik + input.value() + '/' + what + api_key;
    loadJSON(url, gotData);
  }

  function gotData(data) {
    console.log(data);
    var ol = createElement('ol');
    if (what == 'examples') {
      for (var i = 0; i < data.examples.length; i++) {
        var li = createElement('li', data.examples[i].text);
        li.parent(ol);
      }
    } else if (what == 'definitions') {
      for (var i = 0; i < data.length; i++) {
        var li = createElement('li', data[i].partOfSpeech + ': ' + data[i].text);
        li.parent(ol);
      }
    } else if (what == 'relatedWords') {
      for (var i = 0; i < data.length; i++) {
        var words = data[i].words.join(', ');
        var li = createElement('li', data[i].relationshipType + ': ' + words);
        li.parent(ol);
      }
    } else if (what == 'audio') {
      for (var i = 0; i < data.length; i++) {
        var a = createA('#', 'play');
        setSound(a, data[i].fileUrl);
        var li = createElement('li', data[i].audioType + ': ');
        a.parent(li);
        li.parent(ol);
      }
    } else {
      var li = createElement('li', "take a look in the console at the data");
      li.parent(ol);
    }
  }
}