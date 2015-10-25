// Daniel Shiffman
// Programming from A to Z, Fall 2014
// https://github.com/shiffman/Programming-from-A-to-Z-F14

// An array of lines from a text file
var lines;
// The Markov Generator object
var markov;
// An output element
var output;

var slider;

var start;

// Preload some seed data
function preload() {
  linesA = loadStrings('data/natureofcode.txt');
  linesB = loadStrings('data/shakes_short.txt');
}

function setup() {

  // N-gram length and maximum length

  // Make the button
  var button = select('#button');
  button.mousePressed(generate);

  // Make the output element
  output = select('#output');

  slider = select('#slider');
  // slider.input(tooSlow);

  noCanvas();
}

function tooSlow() {
  generate();
}

function generate() {
  markov = new MarkovGenerator(5, 2000);

  var repeat = floor(slider.value() / 10);

  var totalA = 10 - repeat;
  var totalB = repeat;

  console.log(totalA +  ' ' + totalB);

  for (var n = 0; n < totalA; n++) {
    for (var i = 0; i < linesA.length; i++) {
      markov.feed(linesA[i]); 
    }
  }

  for (var n = 0; n < totalB; n++) {
    for (var i = 0; i < linesB.length; i++) {
      markov.feed(linesB[i]); 
    }
  }

  // Generate some text
  var generated = markov.generate();
  // Put in HTML line breaks wherever there was a carriage return
  output.html(generated);

}
