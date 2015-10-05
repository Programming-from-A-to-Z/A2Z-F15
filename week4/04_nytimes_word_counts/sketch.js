// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// API documentation
// http://developer.nytimes.com
// Weirdly it seems to work with 'sample-key'
// But you should probably get your own

// Count term appearance in times per year
var  start, end, total, w;

// Make a url that searhces for term appeared in a given year
function makeURL(term,year) {
  var apikey = '&api-key=sample-key';
  var api = 'http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&';
  var query = 'q='+term+'&facet_field=source&begin_date='+year+'0101&end_date='+year+'1231&facet_filter=true';
  var url = api+query+apikey;
  return url;
}

function setup() {
  var canvas = createCanvas(800, 200);
  background(51);

  // How many years to look at?
  start = 1950;
  end = 2014;
  total = end - start;

  // How wide is each bar
  w = width/total;

  // What should we search for?
  input = select('#search');
  var button = select('#submit');
  // Execute the query
  button.mousePressed(searchIt);
}



function goJSON(url, index) {
  setTimeout(delayLoad, index * 100);

  function delayLoad() {
    loadJSON(url, loaded, 'jsonp');
  }
  
  var total = 0;
  function loaded(data) {
    if (data.response.facets.source.terms[0]) {
      total = data.response.facets.source.terms[0].count;
    }
    var h = map(total, 0, 1000, 0, 50);
    fill(175);
    stroke(0);
    rect(index*w, height - h, w-2, h);
    console.log(total);
  }
}

function searchIt() {
  var term = input.value();
  for (var i = 0; i < total; i++) {
    var year = start + i;
    var url = makeURL(term, year);
    //console.log(url);
    goJSON(url, i);
  }
}

