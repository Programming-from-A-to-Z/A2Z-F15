// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

var wordinput;
var statusElt;
var suggestions;

function setup() {
  noCanvas();

  wordinput = select('#word');
  wordinput.input(spellcheck);

  statusElt = select('#status');
  suggestions = select('#suggestions');

  function spellcheck() {
    var word = wordinput.value();

    if (word.length > 0) {
      var url = "/spellcheck/" + wordinput.value();
      loadJSON(url, checked);
    }

    function checked(data) {
      statusElt.html(data.status);
      if (data.status == 'incorrect') {
        suggestions.html(data.suggestions.join(' '));
      } else {
        suggestions.html('');
      }
    }
  }
  
}