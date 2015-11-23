// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15



function setup() {
  noCanvas();

  var wordinput = select('#word');
  var scoreinput = select('#score');
  var scoreit = select('#scoreit');
  scoreit.mousePressed(submitscore);

  function submitscore() {
    var url = '/add/' + wordinput.value() + '/' + scoreinput.value();
    loadJSON(url, submitted);
    function submitted(result) {
      console.log(result);
    }
  }


  var txt = select('#text');
  var analyzeit = select('#analyze');
  analyzeit.mousePressed(analyze);

  function analyze() {
    var params = {
      text: txt.value()
    }
    httpPost('/analyze', params, success);
  }

  function success(result) {
    result = JSON.parse(result);
    console.log(result);
  }

}