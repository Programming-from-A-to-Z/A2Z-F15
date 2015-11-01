// Daniel Shiffman
// Programming from A to Z, Fall 2014
// https://github.com/shiffman/Programming-from-A-to-Z-F14

// This is based on Allison Parrish's great RWET examples
// https://github.com/aparrish/rwet-examples

// Grammar
var cfree;
// For loading JSON
var grammar;

// Preload the JSON
function preload() {
  grammar = loadJSON('grammars/haiku.json');
}


function setup() {
  // Make a new grammar
  cfree = new ContextFree();

  // Look at the JSON object
  for (var rule in grammar) {
    // Get the expansions and split them
    var expansions = grammar[rule];
    for (var j = 0; j < expansions.length; j++) {
      // Now split up each expansion into its own array
      // Internally, the CF object is using arrays of arrays
      // It's awkward to look at it that in the JSON file so split by whitespace
      var tokens = expansions[j].split(/\s+/);
      // Add the rule
      cfree.addRule(rule, tokens);
    }
  }

  console.log(grammar);
  console.log(cfree);

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
  var expansion = cfree.getExpansion('<start>');
  expansion = expansion.replace(/%/g, '<br/>');
  var par = createP(expansion);
  par.class('text');
}



