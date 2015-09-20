
var dropZone, input, button, sample, clearButton;

var paragraphs = [];

function setup() {

  noCanvas();

  input = select('#textinput');
  button = select('#submit');

  button.mousePressed(handleInput);

  dropZone = select('#drop_zone');
  dropZone.dragOver(draggedOver);
  dropZone.drop(gotFile, dropped);

  sample = select('#sample');
  sample.mousePressed(loadFile);

  clearButton = select('#clear');
  clearButton.mousePressed(clearText);
}

function loadFile() {
  loadStrings('files/spam.txt', fileLoaded);
}

function fileLoaded(data) {
  process(data);
}

function draggedOver() {
  dropZone.style('background-color','#AAA');
}

function dropped() {
  dropZone.style('background-color','');
}

function gotFile(file) {
  if (file.type === 'text') {
    process(file.data);
  } else {
    process('this is not a text file.');
  }
}

function handleInput() {
  process(input.value());
}

function process(txt) {
  var par = createP(txt);
  par.class('text');
  paragraphs.push(par);
}

function clearText() {
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  paragraphs = [];
}
