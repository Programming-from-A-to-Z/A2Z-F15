var input;

function setup() {
  noCanvas();

  input = createInput('wtf');
  var button = createButton('button');
  button.mousePressed(goGetIt);
}

function goGetIt() {
  var term = input.value();
  loadJSON('http://api.urbandictionary.com/v0/define?term=' + term, gotData);
}

function gotData(data) {
  if (data.result_type === 'no_results') {
    createP('I couldn\'t find that.')
  } else {
    var txt = data.list[0].definition;
    createP(txt);
  }
}
