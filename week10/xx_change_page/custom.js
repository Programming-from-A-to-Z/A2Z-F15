

console.log('a');


//var elts = document.getElementsByTagName('div');

var s = function(sketch) {
  sketch.setup = function() {
    var c = sketch.createCanvas(400, 600);
    c.position(0,0);
  }

  sketch.draw = function() {
    sketch.background(0,255,0);
  }

}

var myp5 = new p5(s);
console.log(myp5);

var elts = myp5.selectAll('div');
//console.log(elts);

for (var i = 0; i < elts.length; i++) {
  var img = createImg('')
}







