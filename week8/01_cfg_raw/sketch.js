// Daniel Shiffman
// Programming from A to Z, Fall 2014
// https://github.com/shiffman/Programming-from-A-to-Z-F14

// This is based on Allison Parrish's great RWET examples
// https://github.com/aparrish/rwet-examples

// A grammar object
var cfree;

function setup() {
  // An empty one
  cfree = new ContextFree();

  // We can add rules manually
  cfree.addRule('S', ['NP', 'VP']);
  cfree.addRule('NP', ['the', 'N']);
  cfree.addRule('VP', ['V', 'the', 'N']);

  cfree.addRule('N', ['cat']);
  cfree.addRule('N', ['dog']);
  cfree.addRule('N', ['unicorn']);
  cfree.addRule('N', ['rainbow']);
  cfree.addRule('V', ['sees']);
  cfree.addRule('V', ['chases']);
  cfree.addRule('V', ['falls in love with']);
  cfree.addRule('V', ['believes']);

  noCanvas();
  // A button to generate a new sentence
  var button = select('#generate');
  button.mousePressed(generate);

  var clear = select('#clear');
  clear.mousePressed(clearAll);
}

function clearAll() {
  var elements = selectAll('.text');
  for (var i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
}

function generate() {
  // Make a DIV with the new sentence
  var expansion = cfree.getExpansion('S');
  var par = createP(expansion);
  par.class('text');
}


