

void setup() {
  size(200, 200);
  
  noLoop();
  
  background(51);
  noStroke();
  for (int i = 0; i < 500; i++) {
     float x = random(width);
     float y = random(height);
     fill(255, 0, 200, 50);
     ellipse(x, y, 20, 20);
  }
  
  save("tweet.png");
  exit();
}