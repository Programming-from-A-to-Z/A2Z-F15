/**
 * @name validators
 * @amd isArray ../../../lodash-amd/compat/objects/isArray
 * @amd isFunction ../../../lodash-amd/compat/objects/isFunction
 * @amd isPlainObject ../../../lodash-amd/compat/objects/isPlainObject
 * @amd isString ../../../lodash-amd/compat/objects/isString
 * @amd isRegExp ../../../lodash-amd/compat/objects/isRegExp
 * @amd isBoolean ../../../lodash-amd/compat/objects/isBoolean
 * @amd isDate ../../../lodash-amd/compat/objects/isDate
 * @amd isNumber ../../../lodash-amd/compat/objects/isNumber
 * @cjs isArray lodash-node/compat/objects/isArray
 * @cjs isFunction lodash-node/compat/objects/isFunction
 * @cjs isPlainObject lodash-node/compat/objects/isPlainObject
 * @cjs isString lodash-node/compat/objects/isString
 * @cjs isRegExp lodash-node/compat/objects/isRegExp
 * @cjs isBoolean lodash-node/compat/objects/isBoolean
 * @cjs isDate lodash-node/compat/objects/isDate
 * @cjs isNumber lodash-node/compat/objects/isNumber
 */
function validatorsFactory(
    isArray,
    isFunction,
    isPlainObject,
    isString,
    isRegExp,
    isBoolean,
    isDate,
    isNumber
) {

    var validators = {
        '*': function() {
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
        'p-number': function(o) {
            return validators['number'](o) && o > 0;
        },
        'n-number': function(o) {
            return validators['number'](o) && o < 0;
        },
        'nn-number': function(o) {
            return validators['number'](o) && o >= 0;
        },
        'np-number': function(o) {
            return validators['number'](o) && o <= 0;
        },
        'int': function(o) {
            return o == parseInt(o);
        },
        'n-int': function(o) {
            return o == parseInt(o) && o < 0;
        },
        'p-int': function(o) {
            return o == parseInt(o) && o > 0;
        },
        'nn-int': function(o) {
            return o == parseInt(o) && o >= 0;
        },
        'np-int': function(o) {
            return o == parseInt(o) && o <= 0;
        }
    };

    return validators;

}
