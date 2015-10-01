// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15


var input;
function setup() {
  noCanvas();

  input = select('#search');
  var button = select('#submit');
  button.mousePressed(search);
}

function search() {
  var term = input.value();
  // Get this API key from: 
  // https://console.developers.google.com
  // Also need: https://cse.google.com/cse/manage/all
  var apiKey = "AIzaSyACNm4n5QB1TVHFOAzZg96cVdD3trozg4E";
  var url = "https://www.googleapis.com/customsearch/v1?key=" + apiKey + "&searchType=image" +
            "&cx=017113430126644414771:wwhvz3sxr2q" + 
            "&q=" + term  + "&num=10&start=1&imgSize=large";

  loadJSON(url, gotData);
}

function gotData(data) {

  var items = data.items;
  for (var i = 0; i < items.length; i++) {
    var img = createImg(items[i].link);
    img.size(100, 100);
  }
}