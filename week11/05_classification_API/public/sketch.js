// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15


function setup() {
  noCanvas();

  var trainText = select('#textT');
  var trainButton = select('#submitT');
  var category = select('#category');
  var classification = select('#classification');

  trainButton.mousePressed(train);
  function train() {
    var txt = trainText.value();
    var cat = category.value();
    var data = {
      text: txt,
      category: cat
    }
    httpPost('/train', data, success, error);
  }

  var classifyText = select('#textC');
  var classifyButton = select('#submitC');

  classifyButton.mousePressed(classify);
  function classify() {
    var txt = classifyText.value();
    var data = {
      text: txt,
    }
    console.log(data);
    httpPost('/classify', data, classified, error);
  }

  function classified(result) {
    result = JSON.parse(result);
    console.log(result);

    var info = result.category + '<br/><br/>';
    for (var i = 0; i < result.classifications.length; i++) {
      var category = result.classifications[i];
      info += category.label + ', ' + category.value + '<br/>';
    }

    classification.html(info);
  }
}

function success(result) {
  console.log('success');
  console.log(JSON.parse(result));
}

function error(result) {
  console.log('error');
  console.log(JSON.parse(result));
}