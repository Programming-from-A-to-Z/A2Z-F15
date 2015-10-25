// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Venue IDs
// 108-131
// 4 8 31 44 48 60 73 81 89 101 107 96

// An array of lines from a text file
var lines;

// The Markov Generator object
var titleMarkov;
var descriptionMarkov;

function setup() {
  noCanvas();

  // The Markov Generator
  // First argument is N-gram length, second argument is max length of generated text
  titleMarkov = new MarkovGenerator(3, 50);
  descriptionMarkov = new MarkovGenerator(5, 2000);

  loadJSON('years/1981.json', process)

  // Set up a button
  var button = select('#button');
  button.mousePressed(generate);
}

function process(data) {
  for (var i = 0; i < data.length; i++) {
    titleMarkov.feed(data[i].project_name);
    descriptionMarkov.feed(data[i].description);
  }
}



function generate() {
  // Display the generated text
  var title = select('#title');
  title.html(titleMarkov.generate());

  var description = select('#description');
  description.html(descriptionMarkov.generate());

}
