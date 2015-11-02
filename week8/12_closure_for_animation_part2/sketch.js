// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

function setup() {
  noCanvas();

  for (var i = 0; i < 500; i++) {
    setTimeout(makeElement, i*10);
  }
}

function makeElement() {
  var span = createSpan('nothing');
  var space = createSpan(' ');
  space.parent('padded');
  span.class('box');
  span.parent('padded');
  animate(span);
}


function animate(elt) {

  var count = 0;
  function increment() {
    count = (count + 1) % 100;
    elt.html(count);
  }
  setInterval(increment, 25);
}


