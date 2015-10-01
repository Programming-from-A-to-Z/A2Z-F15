// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// API documentation
// http://developer.nytimes.com
// Weirdly it seems to work with 'sample-key'
// But you should probably get your own


var input;

function setup() {
  noCanvas();

  input = select('#search');
  var button = select('#submit');
  button.mousePressed(search);
}

function search() {
  var term = input.value();

  // URL for querying the times
  var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?'
          + 'callback=svc_search_v2_articlesearch&api-key=sample-key'
          + '&q=' + term;

  loadJSON(url, gotData, 'jsonp');
}

// Request is completed
function gotData(data) {
  console.log(data);
  // Go through and show some results
  docs = data.response.docs;

  for (var i = 0; i < docs.length; i++) {
    var headline = createElement('h3', '');
    var link = createA(docs[i].web_url, docs[i].headline.main);
    link.parent(headline);
    headline.parent('results');
    var par = createP(docs[i].lead_paragraph);
    par.parent('results');
  }
}