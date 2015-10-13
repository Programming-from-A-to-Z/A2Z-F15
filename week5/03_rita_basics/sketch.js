
var sentenceInput, wordInput;

var lex;

var results;

function setup() {
  noCanvas();
  lex = new RiLexicon();

  // A text area
  sentenceInput = select('#sentence');

  // A button
  var analyzeButton = select('#analyze')
  analyzeButton.mousePressed(analyze);

  wordInput = select('#word');

  // A button
  var rhymeButton = select('#rhymes')
  rhymeButton.mousePressed(rhyme);

  var clearButton = select('#clear');
  clearButton.mousePressed(clearAll);
    
}

function analyze() {
  var p = createP('');
  p.class('text');

  var ol = createElement('ol');
  ol.parent(p);

  // What has the user entered?
  var rs = new RiString(sentenceInput.value());
  var features = rs.features();

  var li1 = createElement('li', 'Stresses: ' + features.stresses);
  var li2 = createElement('li', 'Phonemes: ' + features.phonemes);
  var li3 = createElement('li', 'Parts of speech: ' + features.pos);
  li1.parent(ol);
  li2.parent(ol);
  li3.parent(ol);
}

function rhyme() {
  
  var p = createP('');
  p.class('text');

  var ol = createElement('ol');
  ol.parent(p);

  var rhymes = lex.rhymes(wordInput.value());

  for (var i = 0; i < rhymes.length; i++) {
    var li = createElement('li', rhymes[i]);
    li.parent(ol);
  }
}

// Go through and remove all the divs
function clearAll() {
  var par = selectAll('.text');
  for (var i = 0; i < par.length; i++) {
    par[i].remove();
  }
}
