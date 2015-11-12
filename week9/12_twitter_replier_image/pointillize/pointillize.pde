
//public static void main(String[] args) {
//  if (args.length > 0) {
//    PApplet.main(new String[] { "image_test", args[0] });
//  } else {
//    PApplet.main(new String[] { "image_test", "cat.jpg" });
//  }
//}

void setup() {
  size(320, 240);
  printArray(args);
  
  String filename = "cat.jpg";
  
  if (args !=null && args.length > 0) {
    filename = args[0];
  }

  PImage source = loadImage(filename);

  PGraphics g = createGraphics(source.width, source.height);
  g.beginDraw();
  g.background(0);

  for (int i = 0; i < 10000; i++) {
    float x = random(g.width);
    float y = random(g.height);
    color c = source.get(int(x), int(y));
    g.fill(c, 50);
    g.noStroke();
    g.ellipse(x, y, 20, 20);
  }
  g.endDraw();
  g.save("output.png"); 
  exit();

  //exit();
}