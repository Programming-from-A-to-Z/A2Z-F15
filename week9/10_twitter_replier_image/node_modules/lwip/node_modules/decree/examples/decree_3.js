/**
 * Let's say we want to build an API to make coffee.
 * We have a function, `makeCoffee( ... )` with the following signature:
 *
 *    function makeCoffee(sugars, flavor, size, callback);
 *
 * 1. sugars - number of sugars. optional. non-negative decimal number.
 *    defaults to 1.
 * 2. flavor - flavor of the coffee. optional. string. defaults to 'bitter'.
 * 3. size - size of cup. 'small', 'medium', 'large' or any positive integer.
 *    defaults to 'large'.
 * 4. callback - called when coffee is ready.
 */

var decree = require('../');


// Step 1 - Specify the properties of the function's arguments:
// ------------------------------------------------------------
var decs = [{
    name: 'sugars',
    type: 'nn-number', // non-negative
    optional: true,
    default: 1
}, {
    name: 'flavor',
    type: 'string',
    optional: true,
    default: 'bitter'
}, {
    name: 'size',
    types: ['string', 'p-int'], // string or positive integer
    optional: true,
    default: 'large'
}, {
    name: 'callback',
    type: 'function'
}];


// Step 2 - Create a function which receives an array of arguments and decrees
//          if the arguments are valid:
// ---------------------------------------------------------------------------
var judge = decree(decs); // `judge` is a function.


// Step 3 - Use it to handle arguments disambiguation inside your API function.
//          Supply a callback which will be called with the disambiguated
//          arguments.
//          Supply a second callback to handle arguments problems. This
//          guarantees no exceptions will be thrown.
// ----------------------------------------------------------------------------
function makeCoffee() {
    judge(arguments, function(sugars, flavor, size, callback) {
        var msg = size + " cup of " + flavor + " coffe with " + sugars + " sugars.";
        // you can be sure that callback is indeed a function:
        callback(msg);
    }, function(err) {
        console.log("Invalid arguments: " + err);
    });
}

// Step 4 - Use your function:
// ---------------------------
makeCoffee('sweet', 'small', function(msg) {
    console.log(msg); // small cup of sweet coffee with 1 sugars.
});

makeCoffee('sweet', 'small'); // Invalid arguments: Error: Unknown arguments configuration,sweet,small
makeCoffee('foo', function() {}); // Invalid arguments: Error: Arguments ambiguity,Argument 0 matches both flavor (string) and size (string)
