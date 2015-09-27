

function setup() {
  noCanvas();

  var editors = selectAll('.editor');
  console.log(editors.length);

  for (var i = 0; i < editors.length; i++) {
    var editor = ace.edit("editor"+(i+1));
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    var button = select('#run'+(i+1));
    button.mousePressed(evaluateIt.bind(editor));
  }

  function evaluateIt() {
    var code = this.getValue();
    // This is a terrible idea for a lot of reasons! 
    // But we don't really care here so I'm doing it anyway
    // More: http://stackoverflow.com/questions/86513/why-is-using-the-javascript-eval-function-a-bad-idea
    // http://blog.namangoel.com/replacing-eval-with-a-web-worker
    eval(code);
  }


    // var editor2 = ace.edit("editor2");
    // editor2.setTheme("ace/theme/monokai");
    // editor2.getSession().setMode("ace/mode/javascript");

    // var button = select('#run2');
    // button.mousePressed(function() {
    //   var code = editor2.getValue();
    //   eval(code);
    // });

    // var editor3 = ace.edit("editor3");
    // editor3.setTheme("ace/theme/monokai");
    // editor3.getSession().setMode("ace/mode/javascript");

    // var button = select('#run3');
    // button.mousePressed(function() {
    //   var code = editor3.getValue();
    //   eval(code);
    // });


    // var editor4 = ace.edit("editor4");
    // editor4.setTheme("ace/theme/monokai");
    // editor4.getSession().setMode("ace/mode/javascript");

    // var button = select('#run4');
    // button.mousePressed(function() {
    //   var code = editor4.getValue();
    //   eval(code);
    // });


    // var editor5 = ace.edit("editor5");
    // editor5.setTheme("ace/theme/monokai");
    // editor5.getSession().setMode("ace/mode/javascript");

    // var button = select('#run5');
    // button.mousePressed(function() {
    //   var code = editor5.getValue();
    //   eval(code);
    // });


    // var editor6 = ace.edit("editor6");
    // editor6.setTheme("ace/theme/monokai");
    // editor6.getSession().setMode("ace/mode/javascript");

    // var button = select('#run6');
    // button.mousePressed(function() {
    //   var code = editor6.getValue();
    //   eval(code);
    // });

  
  // // Demonstrates exec() in RegExp
  // var text = 'This is a test of regular expressions.';  
  // var regex = /test/;
  // console.log('Test text: ' + text);
  // console.log('Regex: ' + regex);
  // // The function exec() executes a search for a match in string.  the result is an array.
  // var results = regex.exec(text);
  // console.log(results);

  // var output = 'text: ' + text + '<br/>'
  //            + 'regex: ' + regex + '<br/>'
  //            + '<code>regex.exec(text);</code><br/><br/>'

  //            + 'The match found in the text is: ' + results[0] + '<br/>'
  //            + 'And the index where it was found: ' + results.index + '<br/>'
  //            + 'And the input text in case you forgot: ' + results.input + '<br/>';

  // var p1 = createP(output);
  // p1.class('text');


  // // And again with capturing parentheses, the global flag, and a loop
  // var text = 'Now another test including phone numbers: 212-555-1234 and 917-555-4321 and 646.555.9876.';  
  // // Note the use of 'g' for global matches
  // var regex = /(\d+)[-.]\d+[-.]\d+/g;            

  // console.log('Test text: ' + text);
  // console.log('Regex: ' + regex);
   

  // var output =  'text: ' + text + '<br/>'
  //            +  'regex: ' + regex + '<br/><br/>';

  // while (results = regex.exec(text)) {
  //   console.log(results);
  //   output   += 'The full match found in the text is: ' + results[0] + '<br/>'
  //            +  'Group 1 of the match is: ' + results[1] + '<br/>';
  //            +  'And the index where it was found: ' + results.index + '<br/>';
  //         // +  'And the input text in case you forgot: ' + results.input);
  // }
  // var p2 = createP(output);
  // p2.class('text');

  // // Demonstrates match() in String
  // var text = 'This is a test of regular expressions.';  
  // var regex = /test/;               

  // // The function match() executes a search for a match in string.  
  // // The result, just like with exec(), is an array.
  // var results = text.match(regex);

  // createDiv('text: ' + text);
  // createDiv('regex: ' + regex);
  // createDiv('The match found in the text is: ' + results[0]);
  // createDiv('And the index where it was found: ' + results.index);
  // createDiv('And the input text in case you forgot: ' + results.input);
  // createP('');

  // // Now capturing parentheses and the global flag match() works differently
  // // Note we can't actually get group 1 this way
  // var text = 'Now another test including phone numbers: 212-555-1234 and 917-555-4321 and 646.555.9876.';  
  // var regex = /(\d+)[-.]\d+[-.]\d+/g;               

  // createDiv('text: ' + text);
  // createDiv('regex: ' + regex);
  // var results = text.match(regex);
  // for (var i = 0; i < results.length; i++) {
  //   createDiv('Match ' + i + ': ' + results[i]);
  // }
  // createP('');


  // var text = 'Replace every time the word "the" appears with the word ze.'; 
  // var regex = /\bthe\b/g;  
  // var replaced = text.replace(regex,'ze');
  // createDiv(text);
  // createDiv(replaced);
  // createP('');

  // var text = 'This is some markdown where text surrounded by an * is *italicized*.  *one* two *three* four five *six*.'; 
  // var regex = /\*(\w+)\*/gi;

  // // We can use captured groups in the replacement string by referencin $ and the group #
  // var replaced = text.replace(regex,'<em>$1</em>');
  // createDiv(text);
  // createDiv(replaced);

}


