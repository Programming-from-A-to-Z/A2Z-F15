// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15



// Here is where we are working with a regex
function process(txt) {
  // Using match() from String is the simplest way to do this
  // Regex that matches double words, note use of global flag
  var regex = /\b(\w+)\b\s+\1\b/g;         
  var results = txt.match(regex);


  var par = createP('');
  if (results === null) {
    par.html('none found!');
  } else {
    // We get an array of matches back
    var output = '';
    for (var i = 0; i < results.length; i++) {
      output += results[i] + '<br/>';
    }
    // Update the HTML Element
    par.html(output);
  }
  par.class('text');
  paragraphs.push(par);
}


function doublewords() {
  // What has the user entered?
  var text = input.value();

}


/***************************************************/
/* Everything below just handles the text input ****/
/***************************************************/


// Many DOM elements
var dropZone, input, button, sample, clearButton;

// An array to keep track of all the new DOM elements being added
var paragraphs = [];

var inputText = '';

function setup() {

  noCanvas();

  // Selecting the text field and button
  input = select('#textinput');
  button = select('#submit');
  // What to do when button pressed
  button.mousePressed(handleInput);

  // Selected the div which will be the "drop zone"
  // for dragging and dropping files
  dropZone = select('#drop_zone');
  // Here are the events to handle
  dropZone.dragOver(highlight);
  dropZone.drop(gotFile, unHighlight);

  // This link allows quick testing with a file
  // that's ready to load instantly
  sample = select('#sample');
  sample.mousePressed(loadFile);

  // This button clears the new paragraph elements
  // added
  clearButton = select('#clear');
  clearButton.mousePressed(clearText);
}

// Load a file for quick testing
function loadFile() {
  loadStrings('files/spam.txt', fileLoaded);
}
// When the file is loaded
function fileLoaded(data) {
  var txt = data.join('\n');

  input.html(txt);
  // Note the use of a function that will "process" the text
  // This is b/c the text might come in a number of different ways
  // process(txt);
}

// Handle dropzone events
function highlight() {
  dropZone.style('background', '#AAA');
}

function unHighlight() {
  dropZone.style('background','');
}

function gotFile(file) {
  if (file.type === 'text') {
    // process(file.data);
    inputText += file.data + '\n\n';
    input.html(inputText);
  } else {
    // In case it's some weird other kind of file
    alert('this is not a text file.');
  }
}

// Handle the text input field
function handleInput() {
  process(input.value());
}

// Clear all the divs with remove()
function clearText() {
  input.html('');
  intputText = '';
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  paragraphs = [];
}
