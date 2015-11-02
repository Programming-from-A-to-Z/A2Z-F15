// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

function setup() {
  noCanvas();


  var one = select('#apple');
  animate(one);

  var two = select('#pear');
  animate(two);

  var click = select('#click');
  click.mousePressed(start);
}

function start() {
  var three = select('#orange');
  animate(three);
}


function animate(elt) {

  var count = 0;

  function increment() {
    count = count + 1 % 100;
    elt.html(count);
  }

  setInterval(increment, 100);
}


