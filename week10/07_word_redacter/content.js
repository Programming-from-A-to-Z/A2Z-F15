var everything = document.getElementsByTagName("body");

console.log(everything);

for (var i = 0; i < everything.length; i++) {
  var txt = everything[i].innerHTML;
  //var s = "test the <img the> the";
  var tokens = txt.split(/(<.*?>)/);
  for (var j = 0; j < tokens.length; j++) {
    if (tokens[j].charAt(0) !== '<') {
      tokens[j] = tokens[j].replace(/\bthe\b/gi,'<span class="redact">the</span>');
    }
  }
  everything[i].innerHTML = tokens.join('');
}