// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15


var four = ["text", "golf", "rain"];
var five = ["hello", "shirt", "plush"];

// Here is where we are working with a regex
function process(txt) {
  
  var output = txt.replace(/\b[a-z]{3,5}\b/i, replacer);

  function replacer(match) {
     var len = match.length;

     if (len == 3) {
       return match.toUpperCase();
     } else if (len == 4) {
       var index = floor(random(0, four.length));
       return four[index];
     } else if (len == 5) {
       var index = floor(random(0, five.length));
       return five[index]; 
     } 

  }

  // This is how to make everything back to one big paragraph with join()
  var par1 = select('#results');
  par1.html(output);
  par1.class('text');



}


/***************************************************/
/* Everything below just handles the text input ****/
/***************************************************/


function setup() {

  noCanvas();

  // Selecting the text field and button
  input = select('#textinput');
  button = select('#submit');
  // What to do when button pressed
  button.mousePressed(handleInput);

  loadStrings('files/rainbow.txt', fileLoaded);

  regexInput = select('#regex');
  globalCheck = select('#global');
  caseCheck = select('#case');
}


// When the file is loaded
function fileLoaded(data) {
  var txt = data.join('\n');
  input.html(txt);
}

// Handle the text input field
function handleInput() {
  process(input.value());
}