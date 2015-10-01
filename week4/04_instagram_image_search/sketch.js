// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15


var input;
function setup() {
  noCanvas();

  input = select('#search');
  var button = select('#submit');
  button.mousePressed(search);
}

function search() {
  var term = input.value();

  var part1 = 'https://api.instagram.com/v1/tags/';//
  var part2 = '/media/recent?client_id=95f02ca9026d49dd9b5d9be0c8385c0c';
  var url = part1 + term + part2;

  loadJSON(url, gotData, 'jsonp');
}

function gotData(data) {

  // Get the image data
  var images = data.data;
  for (var i = 0; i < images.length; i++) {
    // Make an image element for each one
    var img = createImg(images[i].images.thumbnail.url);
  }
}