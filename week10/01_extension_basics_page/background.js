
chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
  console.log('message received');
  if (request.message === "show_page_action") {
    chrome.pageAction.show(sender.tab.id);
  }
}