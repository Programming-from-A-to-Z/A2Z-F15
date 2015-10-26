// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Venue IDs
// 108-131
// 4 8 31 44 48 60 73 81 89 101 107 96

var venues = [4, 8, 31, 44, 48, 60, 73, 81, 89, 101, 107, 96];

// An array of lines from a text file
var lines;

// The Markov Generator object
var titleMarkov;
var elevatorMarkov;

function setup() {
  noCanvas();

  // The Markov Generator
  // First argument is N-gram length, second argument is max length of generated text
  titleMarkov = new MarkovGenerator(3, 40);
  elevatorMarkov = new MarkovGenerator(6, 1000);

  for (var i = 108; i < 132; i++) {
    var url = 'https://itp.nyu.edu/projects/public/projectsJSON.php?venue_id=' + i;
    loadJSON(url, process)
  }

  for (var i = 0; i < venues.length; i++) {
    var url = 'https://itp.nyu.edu/projects/public/projectsJSON.php?venue_id=' + venues[i];
    loadJSON(url, process)
  }

  // Set up a button
  var button = select('#button');
  button.mousePressed(generate);
}

function process(data) {
  //console.log(data);
  for (var i = 0; i < data.length; i++) {
    titleMarkov.feed(data[i].project_name);

    var elevator = data[i].elevator_pitch;
    if (elevator) {
      // Doing some cleanup
      elevator = elevator.replace(/&lt;/g,'<');
      elevator = elevator.replace(/&gt;/g,'>');


      elevator = elevator.replace(/&.*?;/g,'');
      elevator = elevator.replace(/<.*?>/g,'');

      elevatorMarkov.feed(elevator);
    }
  }
}



function generate() {
  // Display the generated text
  var title = select('#title');
  title.html(titleMarkov.generate());

  var description = select('#description');
  description.html(elevatorMarkov.generate());

}
