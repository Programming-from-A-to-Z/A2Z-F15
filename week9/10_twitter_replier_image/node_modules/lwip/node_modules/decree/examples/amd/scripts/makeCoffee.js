/*********************************************/
/** define an AMD module which uses Decree: **/
/*********************************************/

/**
 * Let's say we want to build an API to make coffee.
 * We have an AMD module, `makeCoffee` with the following signature:
 *
 *      makeCoffee(sugars, flavor, size, callback);
 *
 * 1. sugars - number of sugars. optional. non-negative decimal number.
 *    defaults to 1.
 * 2. flavor - flavor of the coffee. optional. string. defaults to 'bitter'.
 * 3. size - size of cup. 'small', 'medium', 'large' or any positive integer.
 *    defaults to 'large'.
 * 4. callback - called when coffee is ready.
 */
define("makeCoffee", ["decree"], function(decree) {

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


    // Step 2 - Create a function which receives an array of arguments and
    //          decrees if the arguments are valid:
    // -------------------------------------------------------------------
    var judge = decree(decs); // `judge` is a function.


    return function makeCoffee() {

        // Step 3 - Use it to handle arguments disambiguation inside your API.
        //          Supply a callback which will be called with the
        //          disambiguated arguments.
        //          Supply a second callback to handle arguments problems. This
        //          guarantees no exceptions will be thrown.
        // --------------------------------------------------------------------

        judge(arguments, function(sugars, flavor, size, callback) {
            var msg = size + " cup of " + flavor + " coffe with " + sugars + " sugars.";
            // you can be sure that callback is indeed a function:
            callback(msg);
        });

    }

});
