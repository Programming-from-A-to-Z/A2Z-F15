

var sketch = function(p5) {

  var first = true;

  p5.setup = function() {
    var h = p5.constrain(document.body.clientHeight, 0, 2000);
    console.log(h);
    var c = p5.createCanvas(p5.windowWidth, h);
    c.position(0,0);
    // In front of everything!
    c.style('z-index', 500);
    p5.clear();
    p5.background(255,0,200,5);
  }

  p5.mouseDragged = function() {
    if (first) {
      console.log('drawing');
      first = false;
    }

    p5.stroke(0);
    p5.strokeWeight(4);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  }

}


var myp5 = new p5(sketch);








