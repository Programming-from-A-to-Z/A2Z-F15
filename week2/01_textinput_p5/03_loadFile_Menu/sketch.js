var fileSelect;

function setup() {
  noCanvas();
  fileSelect = createFileInput(gotFile, 'multiple');
}

function gotFile(file) {
  var fileDiv = createDiv(file.name + ' ' + file.type + ' ' + file.subtype + ' ' + file.size + ' bytes');
  fileDiv.class('file');
  if (file.type === 'image') {
    var img = createImg(file.data);
    img.class('thumb');
  } else if (file.type === 'text') {
    var par = createP(file.data);
    par.class('text');
  }
}