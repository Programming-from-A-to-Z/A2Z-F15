'use strict';

/* istanbul ignore next */

if (typeof define === 'function' && define.amd) {

    define(['./dist/amd/decree'], function(decree) {
        return decree;
    });

} else if (typeof exports === 'object') {

    module.exports = require('./dist/cjs/decree');

} else throw Error("Cannot find a module loader");
