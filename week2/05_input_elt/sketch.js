// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Adapted from: http://p5js.org/examples/examples/Dom_Input_and_Button.php

var input, button, greeting;

function setup() {

  noCanvas();

  // Make an h2 element
  greeting = createElement('h2', 'What is your name?');
  // Make a text input field
  input = createInput();
  // Make a submit button
  button = createButton('submit');

  // Here a button triggers the "hello message"
  button.mousePressed(greet);

  // p5 has a function for when the user hits enter
  // Since we are using the button, it's not necessary here
  // though we could have both?
  // input.changed(greet);

  // You can also dig into native events for every character typed
  input.elt.addEventListener('input', greetTyping);

}

function greetTyping() {
  // value() is the function to get the contents of the text input
  greeting.html(input.value());
}

function greet() {
  var name = input.value();
  var par = createP('hello '+ name + '!');
}