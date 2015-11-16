
console.log("Chrome extension is running!");


chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
  //console.log(request);

  var elts = document.getElementsByTagName('*');

  for (var i = 0; i < elts.length; i++) {
    elts[i].style['background-color'] = request.color;
    elts[i].style['font-size'] = request.size + '%';
  }

  // document.body.style['background-color'] = request.color;
  // document.body.style['font-size'] = request.size + '%';

  // var reply = {
  //   msg: "thank you!"
  // }
  // sendResponse(reply);
}
