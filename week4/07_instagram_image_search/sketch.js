// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Instagram requires oAuth, but the old API does not seem to
// https://api.instagram.com/v1/

// Input from user
var input;

function setup() {
  noCanvas();

  // Grab the input and button from HTML
  input = select('#search');
  var button = select('#submit');
  // Attach a callback to button press
  button.mousePressed(search);
}

function search() {
  var term = input.value();
  
  // Load the data
  var part1 = 'https://api.instagram.com/v1/tags/';
  var part2 = '/media/recent?client_id=95f02ca9026d49dd9b5d9be0c8385c0c';
  // The search term goes between these two parts of the URL
  var url = part1 + term + part2;

  loadJSON(url, gotData, 'jsonp');
}

// Got the data
function gotData(data) {
  var images = data.data;
  // Make a <img src=""> for each image from google
  for (var i = 0; i < images.length; i++) {
    // Make an image element for each one
    var img = createImg(images[i].images.thumbnail.url);
  }
}