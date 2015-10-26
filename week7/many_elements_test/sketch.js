
function setup() {
  var canvas = createCanvas(50, 50);
  canvas.parent('canvas');

  for (var i = 0; i < 5000; i++) {
    makeIt(i);
  }

  function makeIt(i) {
    setTimeout(reallyMakeIt, i*5);
    function reallyMakeIt() {
      var span = createSpan(i + ' ');
      span.parent('stuff');
    }
  }
}

var angle = 0;

function draw() {
  background(200);
  translate(width/2, height/2);
  rotate(angle);
  fill(200);
  ellipse(0, 0, width, height);
  strokeWeight(4);
  line(-width/2, 0, width/2, 0);
  stroke(0);
  line(0, -height/2, 0, height/2);
  angle += 0.1;
}
