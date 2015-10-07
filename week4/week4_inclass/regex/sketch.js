



function setup() {
  noCanvas();
  var words = ['hello', 'goodbye', 'welcome'];

  var s = "This is some text and some things are <b>bolded</b>. "
      + "and here is <b>something else bolded</b> and <b></b>";

  var r = /<b>(.*?)<\/b>/g;
  // var matches = r.exec(s);
  // while (matches != null) {
  //   console.log(matches);
  //   createP(matches[1] + ' ' + matches.index);
  //   matches = r.exec(s);
  // }

  createP(s);
  // var txt = s.replace(r, '<em>$1</em>')
  function replacer(match, group1) {
    var index = floor(random(words.length));
    var word = words[index];
    return "<em>" + word + "</em>"
  }
  var txt = s.replace(r, replacer);
  createP(txt);
}
