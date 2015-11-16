
//var avatars = document.getElementsByClassName('avatar');
var avatars = document.getElementsByClassName('avatar');
var gravatars = document.getElementsByClassName('gravatar');

for (var i = 0; i < avatars.length; i++) {
  swapImg(avatars[i]);
}

for (var j = 0; j < gravatars.length; j++) {
  swapImg(gravatars[j]);
}

function swapImg(img) {
  var newimg = chrome.extension.getURL("images/rainbow.png");
  img.src = newimg;
}

var descriptions = document.getElementsByClassName('repository-description');

for (var k = 0; k < descriptions.length; k++) {

  var txt = descriptions[k].innerHTML;

  var words = txt.split(/\s+/);
  words = words.reverse();
  txt = words.join(' ');

  descriptions[k].innerHTML = txt;
  descriptions[k].style['background-color'] = '#F0C';
}

