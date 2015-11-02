// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Closure basics
// Based on some examples from: https://www.manning.com/books/secrets-of-the-javascript-ninja


/******************* Even more insane! *******************/

// The basic idea
var after;

function outerFunction() {
  
  function innerFunction() {
    console.log(rainbow);
  }
  after = innerFunction;
}

// When this function is called
// innerFunction is defined with a closure that stores
// everything currently in scope 
outerFunction();

// The variable rainbow hasn't even been declared yet!  Of course is undefined!
console.log(rainbow);

// Now this is declared at the end?  Crazy!
var rainbow = 'rainbow';

// But this one works b/c after stores a reference to innerFunction
// and so everything contained in the closure is maintained!
after();







