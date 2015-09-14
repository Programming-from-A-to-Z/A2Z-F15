
var sliders = [];


function setup() {
  noCanvas();

  for (var i = 0; i < 200; i++) {
    var slider = createSlider(0, 100, 50);
    sliders.push(slider);
  }
}

var offset = 0;

function draw() {
  for (var i = 0; i < sliders.length; i++) {
    var n = map(sin(offset + i / 46), -1, 1, 0, 100);
    sliders[i].value(n);
  }
  offset += 0.1;
}



// function setup() {
//   noCanvas();

//   for (var i = 0; i < 300; i++) {
//     var slider = createSlider(0, 100, 50);
//     sliders.push(slider);

//     slider.elt.oninput = function() {
//       console.log(sliders.length);
//       for (var j = 0; j < sliders.length; j++) {
//         if (sliders[j].elt !== this) {
//           sliders[j].value(this.value);
//         }
//       }
//     }
//   }
// }



