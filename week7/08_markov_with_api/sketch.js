// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Thanks to Dana for the idea: http://www.blondishmoment.com/2015/10/21/icm7/

// An array of lines from a text file
var lines;

// The Markov Generator object
var markovs = [];
var current = 3;
var start = 2;
var end = 11;

// Global variable to save the data from the sheet
var sheet;

var count = 0;
var angle = 0;

var total = 0;

function draw() {
  background(255);
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

function setup() {
  var canvas = createCanvas(50, 50);
  canvas.parent('loading');
  var div = createDiv("loading");
  div.parent('loading');

  // var loading = createP('loading');
  // setInterval(test, 10);
  // function test() {
  //   loading.html(random(100));
  // }

  // The Markov Generator
  // First argument is N-gram length, second argument is max length of generated text
  for (var i = start; i < end; i++) {
    markovs[i] = new MarkovGenerator(i, 1000);    
  }


  // Newest relationship advice posts
  // var url = 'https://www.reddit.com/r/relationship_advice/new.json';
  var url = 'https://www.reddit.com/r/relationship_advice.json';
  loadJSON(url, gotPost);

  function gotPost(data) {
    var posts = data.data.children;

    total = posts.length;

    //for (var i = 0; i < 5; i++) {
    for (var i = 0; i < posts.length; i++) {
      var id = posts[i].data.id;
      var newurl = 'https://www.reddit.com/r/relationship_advice/comments/' + id + '.json';

      delayIt(newurl, i);

      // loadJSON(newurl, gotComments);
    }
  }

  function delayIt(url, i) {
    console.log(url + " " + i);
    setTimeout(getComments, i*200);
    function getComments() {
      loadJSON(url, gotComments);
    }
  }

  function gotComments(data) {
    var advice = data[1].data.children;
    for (var i = 0; i < advice.length; i++) {
      for (var n = start; n < end; n++) {
        markovs[n].feed(advice[i].data.body);
      } 
    }
    count++;
    if (count === total) {
      var inter = select('#interface');
      inter.show();
      var loading = select('#loading');
      noLoop();
      loading.hide();
    }
  }

  // Set up a button
  var button = select('#button');
  button.mousePressed(generate);

  // This slider changes the "order" of the markov chain
  var slider = select('#slider');
  slider.input(changeOrder);

  // Regenerate the markov chain with new order value
  function changeOrder() {
    order = slider.value();
    // Update DOM element to show user changed value
    var span = select('#order');
    span.html(order);  

    //generate();
  }


}


function generate() {
  // Display the generated text
  var output = select('#advice');
  var text = markovs[current].generate();
  output.html(text);
}
