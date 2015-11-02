// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Closure basics
// Based on some examples from: https://www.manning.com/books/secrets-of-the-javascript-ninja


/******************* The basic idea *******************/


// Rainbow is in global scope!
var rainbow = 'rainbow';
var after;

function outerFunction() {

  // A function defined inside a function!
  // It has "local" scope, but if it is called
  // later its scope is retained as a "closure"!
  function innerFunction() {
    console.log(rainbow);
  }
  after = innerFunction;
}

// When this function is called
// innerFunction is defined with a closure that stores
// everything currently in scope 
outerFunction();

// Of course this outputs rainbow
// After all its a global variable so we can access it here
after();






