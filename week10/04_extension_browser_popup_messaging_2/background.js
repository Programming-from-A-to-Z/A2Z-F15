
chrome.runtime.onMessage.addListener(receiver);


var word;

function receiver(request, sender, sendResponse) {
  word = request.word;
  console.log(word);
}


