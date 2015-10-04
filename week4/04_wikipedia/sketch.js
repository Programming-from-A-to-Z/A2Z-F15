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
  var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
          + '&search=' + term;

  loadJSON(url, gotData, 'jsonp');
}

// We got the list of articles
function gotData(data) {
  // Look at article list
  var articles = data[1];

  // Make a clickable link for each one
  for (var i = 0; i < articles.length; i++) {

    // We could also have this example just link to the articles themselves
    // var link = 'http://en.wikipedia.org/w/index.php?title=' + articles[i];
    // var a = createA(link, articles[i]);

    // But we are doing something fancier and excuting another query!
    var li = createElement('li', '');
    var a = createA('#', articles[i]);
    a.parent(li);
    li.parent('list');
    // Another callback
    a.mousePressed(getContent(articles[i]));
  }
}


// A closure function factory
// Execute another API query
function getContent(article) {
  // Form the URL
  var url = 'http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json';
  return function() {
    article = article.replace(/\s+/,'_');
    console.log(url + '&titles=' + article);
    // The callback for this is get content
    loadJSON(url + '&titles=' + article, gotContent, 'jsonp');
  }
}

// Here we got some content for specific article
function gotContent(data) {
  var page = data.query.pages;
  // The content is in the page's ID #, but we don't actually know the ID number
  // But it always comes first, this is a goofy way to get it
  var id = Object.keys(page)[0];
  // Look at the actual content
  var txt = page[id].revisions[0]['*'];
  // Show in on the HTML page
  createP(txt);
}