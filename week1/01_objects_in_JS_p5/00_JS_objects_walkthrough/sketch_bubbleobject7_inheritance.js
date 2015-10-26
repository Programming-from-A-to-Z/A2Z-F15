var bubble1;
var bubble2;

var Bubble = function (x) {
 this.x = x;
 this.y = height;
 this.w = 100;
}

Bubble.prototype.move = function() {
  this.x = this.x + random(-1,1);
  this.y = this.y - 1;
};

Bubble.prototype.display = function() {
  fill(125);
  stroke(255);
  ellipse(this.x, this.y, this.w, this.w);
}

var ColorBubble = function(x) {
  Bubble.call(this, x);
  this.col = color(255, 0, 100);
}

ColorBubble.prototype = Object.create(Bubble.prototype);
ColorBubble.prototype.constructor = ColorBubble;

ColorBubble.prototype.display = function() {
  fill(this.col);
  ellipse(this.x, this.y, this.w, this.w);
}


function setup() {
  createCanvas(600,400);

  bubble1 = new Bubble(300); 
  bubble2 = new ColorBubble(100); //Object.create(bubble1);

}

function draw() {
  background(50);

  bubble1.display();
  bubble1.move();

  bubble2.display();
  bubble2.move();
}



