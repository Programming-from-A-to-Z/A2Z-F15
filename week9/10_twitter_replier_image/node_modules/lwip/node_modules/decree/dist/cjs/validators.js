module.exports = function validatorsFactory(isArray, isFunction, isPlainObject, isString, isRegExp, isBoolean, isDate, isNumber) {
    var validators = {
        '*': function () {
            return true;
        },
        'array': isArray,
        'function': isFunction,
        'hash': isPlainObject,
        'string': isString,
        'regexp': isRegExp,
        'date': isDate,
        'boolean': isBoolean,
        'number': isNumber,
        'p-number': function (o) {
            return validators['number'](o) && o > 0;
        },
        'n-number': function (o) {
            return validators['number'](o) && o < 0;
        },
        'nn-number': function (o) {
            return validators['number'](o) && o >= 0;
        },
        'np-number': function (o) {
            return validators['number'](o) && o <= 0;
        },
        'int': function (o) {
            return o == parseInt(o);
        },
        'n-int': function (o) {
            return o == parseInt(o) && o < 0;
        },
        'p-int': function (o) {
            return o == parseInt(o) && o > 0;
        },
        'nn-int': function (o) {
            return o == parseInt(o) && o >= 0;
        },
        'np-int': function (o) {
            return o == parseInt(o) && o <= 0;
        }
    };
    return validators;
}(require('lodash-node/compat/objects/isArray'), require('lodash-node/compat/objects/isFunction'), require('lodash-node/compat/objects/isPlainObject'), require('lodash-node/compat/objects/isString'), require('lodash-node/compat/objects/isRegExp'), require('lodash-node/compat/objects/isBoolean'), require('lodash-node/compat/objects/isDate'), require('lodash-node/compat/objects/isNumber'));