// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(buttonClicked);


function buttonClicked(tab) {
  // Send a message to the active tab
  console.log("button clicked!");

  // Send a message to the tab that is open when button was clicked
  chrome.tabs.sendMessage(tab.id, {"message": "browser action"});

  // Code for querying all the tabs
  // chrome.tabs.query({active: true, currentWindow: true}, activeTabs);
  // function activeTabs(tabs) {
  // }
}

chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
  if (request.message === "thank you") {
    chrome.tabs.create( {"url": "https://www.google.com/?q=thank+you" } );
  }
}