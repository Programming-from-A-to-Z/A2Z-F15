import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class randomwalk extends PApplet {

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

Walker w;

public void setup() {
  
  // Create a walker object
  w = new Walker();
  background(255);

  // Run the walker object
  for (int i = 0; i < 100000; i++) {
    w.step();
    w.render();
  }
  save("output.png");

  noLoop();
  exit();
}
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A random walker object!

class Walker {
  int x,y;

  Walker() {
    x = width/2;
    y = height/2;
  }

  public void render() {
    stroke(0);
    point(x,y);
  }

  // Randomly move up, down, left, right, or stay in one place
  public void step() {
    
    int choice = PApplet.parseInt(random(4));
    
    if (choice == 0) {
      x++;
    } else if (choice == 1) {
      x--;
    } else if (choice == 2) {
      y++;
    } else {
      y--;
    }

    x = constrain(x,0,width-1);
    y = constrain(y,0,height-1);
  }
}
  public void settings() {  size(640, 360); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "randomwalk" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
