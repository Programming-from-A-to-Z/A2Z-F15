
function process(data) {
  var words = splitTokens(data, ' .,:;!@#$%&*()\n');

  words = shuffle(words);


  var output = '';
  for (var i = 0; i < words.length; i++) {
    if (random(100) < percent) {
      output += words[i] + ' ';
    }
  }

  var txt = createP(output);
  txt.class('text');
  paragraphs.push(txt);


  // Temporarily overriding splitTokens until
  // https://github.com/processing/p5.js/pull/931
  function splitTokens() {
    var d = (arguments.length > 1) ? new RegExp('[' + arguments[1] + ']', 'g') : /\s/g;
    return arguments[0].split(d).filter(function(n){return n;});
  };
}


// From: http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}


