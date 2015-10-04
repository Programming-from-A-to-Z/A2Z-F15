// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15



function setup() {
  noCanvas();

  loadStrings('http://www.imdb.com/title/tt0058331/', gotData);

  function gotData(data) {
    console.log(data);
  }

}






