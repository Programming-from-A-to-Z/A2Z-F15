// Creating other HTML elements, adding style.

function setup() {
  noCanvas();
  var text = createP('This is a paragraph element.');

  // With the style method we can pass in CSS directly in our code
  text.style('font-family', 'monospace');
  text.style('background-color', '#FF00CC');
  text.style('color', '#FFFFFF');
  text.style('font-size', '18pt');
  text.style('padding', '10px');
}