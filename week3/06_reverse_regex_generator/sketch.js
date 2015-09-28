// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15



/***************************************************/
/* Everything below just handles the text input ****/
/***************************************************/



// Checkboxes and regex input
var regexInput;

// An array to keep track of all the new DOM elements being added
var paragraphs = [];

function setup() {

  noCanvas();

  button = select('#submit');
  // What to do when button pressed
  button.mousePressed(handleInput);


  // This button clears the new paragraph elements
  // added
  clearButton = select('#clear');
  clearButton.mousePressed(clearText);

  regexInput = select('#regex');
}


// Handle the text input field
function handleInput() {

  var regex = new RegExp(regexInput.value());
  var randexp = new RandExp(regex);
  var txt = randexp.gen();
  var par = createP(txt);
  par.class('text');
  paragraphs.push(par);
}

// Clear all the divs with remove()
function clearText() {
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  paragraphs = [];
}