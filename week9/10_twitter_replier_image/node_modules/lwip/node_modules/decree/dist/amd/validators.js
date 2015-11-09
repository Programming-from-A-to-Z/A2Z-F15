define([
    '../../../lodash-amd/compat/objects/isArray',
    '../../../lodash-amd/compat/objects/isFunction',
    '../../../lodash-amd/compat/objects/isPlainObject',
    '../../../lodash-amd/compat/objects/isString',
    '../../../lodash-amd/compat/objects/isRegExp',
    '../../../lodash-amd/compat/objects/isBoolean',
    '../../../lodash-amd/compat/objects/isDate',
    '../../../lodash-amd/compat/objects/isNumber'
], function validatorsFactory(isArray, isFunction, isPlainObject, isString, isRegExp, isBoolean, isDate, isNumber) {
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
});