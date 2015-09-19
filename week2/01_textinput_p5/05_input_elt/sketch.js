// Adapted from: http://p5js.org/examples/examples/Dom_Input_and_Button.php

var input, button, greeting;

function setup() {

  noCanvas();

  greeting = createElement('h2', 'What is your name?');
  input = createInput();
  button = createButton('submit');

  // Here a button triggers the "hello message"
  button.mousePressed(greet);

  // p5 has a function for when the user hits enter
  // The same hello message is triggered
  input.changed(greet);

  // You can also dig into native events for every character typed
  input.elt.addEventListener('input', greetTyping);

}

function greetTyping() {
  greeting.html(input.value());
}

function greet() {
  var name = input.value();
  var par = createP('hello '+ name + '!');
}