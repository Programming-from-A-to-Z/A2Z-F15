
function setup() {
  noCanvas();
  var col = select('#color');
  col.input(sendMessage);
  var slider = select('#size');
  slider.input(sendMessage);

  function sendMessage() {
    var msg = {
      from: 'popup',
      color: col.value(),
      size: slider.value()
    }
    var params = {
      active: true,
      currentWindow: true    
    }
    chrome.tabs.query(params, gotTabs);
    function gotTabs(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, msg);//, messageBack);
    }
  }
}


// function messageBack(msg) {
//   console.log(msg);
// }

