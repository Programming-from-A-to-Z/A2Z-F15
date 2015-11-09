[![Version](http://img.shields.io/npm/v/decree.svg)](https://www.npmjs.org/package/decree)
[![Build Status](https://api.travis-ci.org/EyalAr/Decree.svg?branch=master)](https://travis-ci.org/EyalAr/Decree)
[![Coverage Status](https://img.shields.io/coveralls/EyalAr/Decree/master.svg)](https://coveralls.io/r/EyalAr/Decree)

# Declarative arguments-resolver

0. [Overview](#overview)
    0. [Install](#install)
    0. [Example](#example)
0. [How to use](#how-to-use)
    0. [Declaration structure](#declaration-structure)
    0. [Errors](#errors)
    0. [Built-in types](#built-in-types)
    0. [Custom types](#custom-types)

## Overview

Decree is a declarative arguments-resolver. It saves you time and code when you
need to do arguments validation and disambiguation in your APIs.

Simply declare the conditions your arguments should hold, such as their types,
whether they are optional and their default values. Decree will take care of the
rest, and provide you with clean and disambiguated arguments.

If the user provided an illegal combination of arguments, Decree will tell you
where was the problem.

### Install

0. **To use in Node, install with npm:** `npm install decree`
0. **To use in the browser, install with bower:** `bower install decree`  
   On the browser Decree loads as an AMD module (see
   [`examples/amd`](examples/amd)).

### Example

Let's say you have a function which takes 4 arguments, some are optional. Inside
the function you need to:

0. Verify the types of the arguments.
0. Detect which of the arguments were provided and which were omitted.
0. Disambiguate and assign default values to omitted arguments.

**Without Decree:**

```Javascript
/**
 * Make a cup of coffee.
 * @param {number} [sugars=1] - number of sugars. non-negative decimal number. defaults to 1.
 * @param {string} [flavor='bitter'] - flavor of the coffee. defaults to 'bitter'.
 * @param {string|integer} [size='large'] - size of cup. 'small', 'medium', 'large' or a positive integer.
 * @param {function} callback - called when coffee is ready.
 */
function makeCoffee(sugars, flavor, size, callback){
    // verify arguments:
    // was sugars provided? if not, flavor = sugars? size = flavor? callback = size?
    // but what if flavor was not provided...?
    // what about the callback? maybe callback = size? callback = flavor?
    // is 'callback' a function? if not, throw an exception?
    // ...
    // ...
    // ...
    // finally:
    if (/* arguments are valid */){
        // make coffee...
        callback('Coffee is ready!');
    } else {
        throw Error('Invalid arguments!');
    }
}
```

**With Decree:**

Simply decalare the properties of your arguments:

```Javascript
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
```

Let Decree do the rest:

```Javascript
/**
 * Make a cup of coffee.
 * @param {number} [sugars=1] - number of sugars. non-negative decimal number. defaults to 1.
 * @param {string} [flavor='bitter'] - flavor of the coffee. defaults to 'bitter'.
 * @param {string|integer} [size='large'] - size of cup. 'small', 'medium', 'large' or a positive integer.
 * @param {function} callback - called when coffee is ready.
 */
function makeCoffee() {
    decree(decs)(arguments, function(sugars, flavor, size, callback) {
        // arguments are disambiguated and ready to be used.
        // make coffee...
        callback('Coffee is ready!');
    });
};
```

Now use your function as usual:

```Javascript
makeCoffee(1.5, function(msg){
    console.log(msg); // 'Coffee is ready!'
});
```

## How to use

Decree needs to know what you expect. Simply build an array to describe your
arguments expectations.

```Javascript
// declarations:
var decs = [{/* arg 1 */}, {/* arg 2 */}, {/* arg 3 */}, ...];
```

Each item in the array is an object which describes an argument. See
[declaration structure](#declaration-structure).

When finished declaring your expectations, use Decree to resolve an array of
arguments. Calling `decree(...)` will construct a function which receives an
array of arguments and disambiguates it.

```Javascript
var judge = decree(decs); // `judge` is a function
```

The constructed *judge* function has the following signature:

`function judge(args, callback, errCallback)`

0. `args {Array}` - The array of arguments to disambiguate.
0. `callback {Function}` - an optional callback function which is called with
   the disambiguated arguments.
0. `errCallback {Function}` - an optional callback to handle arguments errors.
   This function is called with the error, if there was an error disambiguating
   the arguments array.

**Note:**

* If `errCallback` is omitted, and there is an error, an exception will be
  thrown.
* If `callback` is omitted as well, `judge` will return the array of
  disambiguated arguments.

```Javascript
var decree = require('decree');
var decs = [ /* declarations of foo's arguments */ ];
var judge = decree(decs);

function foo() {
    // pass your function's arguments directly to decree:
    judge(arguments, function(arg1, arg2, arg3, ...) {
        // here you can be sure your arguments are of
        // the correct types and values.
    }, function(err){
        // there was a problem with the provided arguments.
        // log it, and throw an exception to the user.
        console.log(err);
        throw err;
    });
}

// use foo as normal:
foo( ... );
```

### Declaration structure

When declaring an argument, tell Decree:

0. `name {String}`: **Optional**. Will be used to identify the argument in error
   messages.
0. `type {String}` / `types{Array[String]}`: **Required**.
   See [built-in types](#built-in-types) or [custom types](#custom-types).
0. `optional {Boolean}`: **Optional**. Is this argument optional?
   Defaults to `false`.
0. `default`: **Optional**. If the argument is optional, this default value will
   be assigned if no value is provided.

```Javascript
{
    name: ...,
    types: [ ... ],
    optional: ...,
    default: ...
}
```

**Note:** If an optional argument has no default value, and that argument is
omitted by the user, decree will assign this argument `undefined`.

### Errors

When there is a problem with the arguments Decree can provide a detailed
explanation of what went wrong. By default, an error object will be thrown,
unless you provide a second callback which is called with the error.

```Javascript
var decree = require('decree');

// with an exception:
function foo() {
    try {
        decree(/* decs */)(arguments, function(/* args */) {
            // ...
        });
    } catch (err) {
        // if here, there was a problem with the arguments the user passed.
        // 'err' contains the information you need
    }
}

// or, with an error handling callback:
function foo() {
    decree(/* decs */)(arguments, function(/* args */) {
        // ...
    }, function(err) {
        // if here, there was a problem with the arguments the user passed.
        // 'err' contains the information you need
    });
}
```

### Built-in types

Decree supports several argument types:

- `*`: Argument matches any type.
- `array`
- `function`
- `hash`: Argument is a simple key-value object.
- `string`
- `regexp`: Argument is a regular expression.
- `boolean`
- `date`: Argument is a Date object.
- `number`
- `n-number`: Argument is a negative number
- `p-number`: Argument is a positive number
- `nn-number`: Argument is a non-negative number
- `np-number`: Argument is a non-positive number
- `int`: Argument is an integer
- `n-int`: Argument is a negative integer
- `p-int`: Argument is a positive integer
- `nn-int`: Argument is a non-negative integer
- `np-int`: Argument is a non-positive integer

### Custom types

Register a custom type with:

`decree.resigter(name, validator)`

0. `name {String}` - The name of the new type.
0. `validator {Function}` - A validation function. Receives a value and should
   return `true` or `false`.

**Example:**

```Javascript
var decree = require('decree');

// register a 'color' type:
decree.register('color',function(v){
    return ["blue", "red", "green", "yellow"].indexOf(v) !== -1;
});

// use it:
var decs = [{
    type: 'color',
    optional: true,
    default: "blue"
}];
```
