
console.log("Chrome extension is running!");

// Highlight all paragraphs
var elts = document.getElementsByTagName('p');
for (var i = 0; i < elts.length; i++) {
  elts[i].style['background-color'] = '#CCC';
}


chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
  if (request.message === "browser action") {
    var elts = document.getElementsByTagName('p');
    for (var i = 0; i < elts.length; i++) {
      elts[i].style['background-color'] = '#F0C';
    }

    // Send a message back!
    chrome.runtime.sendMessage({ "message": "thank you" });
  }
}
