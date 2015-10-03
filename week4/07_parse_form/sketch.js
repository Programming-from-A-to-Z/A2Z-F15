// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15


var fruitInput;
var totalInput;

var listItems = [];

function setup() {
  
  Parse.initialize("63MFKUwjDE4syXL3vr3hFJw6Ic5brmF7VfHbJgti", "P9eoSLPUbdkVLr60iYHd58iD4Jje2fgrFXHiN5Oc");

  fruitInput = select('#fruit');
  totalInput = select('#total');

  var submit = select('#submit');
  submit.mousePressed(sendToParse);

  loadParse();


}

function loadParse() {
  var Fruit = Parse.Object.extend("Fruit");
  var query = new Parse.Query(Fruit);

  var callbacks = {
    success: gotData,
    error: function(error) {
      console.log(error);
    }    
  }
  // Getting all the Fruit objects
  query.find(callbacks);
}

function sendToParse() {
  var data = {
    fruit: fruitInput.value(),
    total: totalInput.value()
  }

  var Fruit = Parse.Object.extend("Fruit");
  var fruit = new Fruit();
  fruit.save(data).then(finished);

  function finished() {
    console.log('Data saved successfully');
    loadParse();
  }
}

// The data comes back as an array of objects
// Each object contains all the data for one row of the sheet
// See comment above
function gotData(data) {
  // Look at the data in the console 
  console.log(data);
  clearList();

  // Make an HTML list
  var list = createElement('ol');
  list.parent('data');
  for (var i = 0; i < data.length; i++) {
    var item = data[i]._serverData;
    var li = createElement('li', item.fruit + ': ' + item.total + ", id: " + data[i].id);
    li.parent(list);
    listItems.push(li);
  }
}

function clearList() {
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].remove();
  }
}

