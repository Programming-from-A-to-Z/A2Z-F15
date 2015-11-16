chrome.omnibox.onInputChanged.addListener(omniInput);

function omniInput(text, suggest) {
  var suggestions = [
    {content: text + " apple", description: "say for apple also"},
    {content: text + " pear", description: "say for pear also"}
  ];
  suggest(suggestions);
}

chrome.omnibox.onInputEntered.addListener(omniChanged);

function omniChanged(text) {
  // chrome.tabs.update({
  //    url: "http://www.google.com/?q=" + text
  // });  
  console.log(text);
  chrome.tts.speak(text);
}