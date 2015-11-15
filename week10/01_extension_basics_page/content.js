
console.log("Page action chrome extension is running!");

chrome.runtime.sendMessage({ "message": "show_page_action" });

// Highlight all paragraphs
var elts = document.getElementsByTagName('p');
for (var i = 0; i < elts.length; i++) {
  elts[i].style['background-color'] = '#CCC';
}