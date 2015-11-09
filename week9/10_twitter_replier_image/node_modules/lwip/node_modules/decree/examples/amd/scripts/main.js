// example requireJS configuration
require.config({
    map: {
        '*': {
            'decree': '../bower_components/decree/decree'
        }
    }
});

require(["makeCoffee"], function(makeCoffee) {

    // Step 4 - Use your function:
    // ---------------------------
    makeCoffee('sweet', 'small', function(msg) {
        log(msg);
        // small cup of sweet coffee with 1 sugars.
    });

    try {
        makeCoffee('sweet', 'small');
        // Invalid arguments: Error: Unknown arguments configuration,sweet,small
    } catch (err) {
        log(err);
    }

    try {
        makeCoffee('foo', function() {});
        // Invalid arguments: Error: Arguments ambiguity,Argument 0 matches both flavor (string) and size (string)
    } catch (err) {
        log(err);
    }

    function log(msg){
        var div = document.createElement('div');
        div.innerHTML = msg;
        document.body.appendChild(div);
    }
});
