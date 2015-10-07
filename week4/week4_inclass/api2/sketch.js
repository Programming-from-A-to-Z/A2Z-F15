function setup() {
  noCanvas();
  loadJSON('birds.json', gotData);


}

function gotData(data) {
  console.log(data);

  //createP(data.birds[0].members[3]);

  for (var i = 0; i < data.birds.length; i++) {
    var bird = data.birds[i];
    //console.log(bird);

    createElement('h1', bird.family);
    for (var j = 0; j < bird.members.length; j++) {
      createDiv(bird.members[j]);
    }

  }
}
