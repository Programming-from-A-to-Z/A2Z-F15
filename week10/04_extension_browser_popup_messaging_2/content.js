
console.log("Chrome extension is running!");


chrome.runtime.onMessage.addListener(receiver);
function receiver(request, sender, sendResponse) {

}


document.addEventListener('mouseup', selectedText);

function selectedText(event) {
  var selected = window.getSelection().toString();

  if (selected.length > 0) {
    console.log(selected);
    chrome.runtime.sendMessage({ "word": selected });
  }
}