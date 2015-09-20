
var dropZone, input, button, sample, clearButton;

var slider;

var paragraphs = [];
var percent = 50;

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

  slider = select('#percentslider');

  slider.elt.addEventListener('input', changePercent);
}

function changePercent() {
  var span = select('#percent');
  percent = slider.value();
  span.html(percent);
}

function loadFile() {
  loadStrings('files/spam.txt', fileLoaded);
}

function fileLoaded(data) {
  var txt = data.join('\n');
  process(txt);
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


function clearText() {
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  paragraphs = [];
}
