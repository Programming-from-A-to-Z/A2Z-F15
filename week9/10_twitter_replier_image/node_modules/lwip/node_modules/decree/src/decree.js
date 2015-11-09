/**
 * @name decree
 * @amd clone ../../../lodash-amd/compat/objects/cloneDeep
 * @cjs clone lodash-node/compat/objects/cloneDeep
 */
function decreeFactory(clone, validators) {

    function getPcs(list) {
        // possible configurations
        var pcs = [];
        pcs.push([]);
        list.forEach(function(item) {
            var _pcs = [];
            pcs.forEach(function(pc, j) {
                for (var i = 0; i < item.types.length; i++) _pcs.push(pc.slice());
            });
            _pcs.forEach(function(pc, i) {
                var type = item.types[i % item.types.length];
                pc.push({
                    __id: item.__id,
                    name: item.name,
                    type: type,
                    validator: validators[type]
                });
            });
            if (item.optional) {
                pcs = pcs.concat(_pcs);
            } else {
                pcs = _pcs;
            }
        });
        return pcs;
    }

    function match(pcs, args) {
        var res = [];
        pcs.filter(function(pc) {
            return pc.length === args.length;
        }).forEach(function(pc) {
            for (var i = 0; i < pc.length; i++)
                if (!pc[i].validator(args[i]))
                    return;
            res.push(pc);
        });
        return res;
    }

    function getJudge(list) {
        var pcs = getPcs(list.map(function(item, i) {
            item.__id = i;
            if (!item.types) item.types = [item.type || '*'];
            item.types = item.types.map(function(type) {
                type = type.toLowerCase();
                if (!validators[type]) throw Error('Unkown type ' + type);
                return type;
            });
            return item;
        }));
        return function(args, success, error) {
            args = Array.prototype.slice.call(args, 0);
            var matchedPcs = match(pcs, args);
            if (matchedPcs.length === 1) {
                var mpc = matchedPcs[0];
                var _args = [];
                list.forEach(function(item) {
                    for (var i = 0; i < mpc.length; i++) {
                        if (mpc[i].__id === item.__id) {
                            _args.push(args[i]);
                            return;
                        }
                    }
                    _args.push(clone(item.default));
                });
                if (validators['function'](success)) success.apply(null, _args);
                else return _args;
            } else if (matchedPcs.length === 0) {
                var errs = [
                    "Unknown arguments configuration",
                    Array.prototype.slice.call(args, 0)
                ];
                if (validators['function'](error)) error(Error(errs));
                else throw Error(errs);
            } else {
                var errs = ["Arguments ambiguity"];
                for (var i = 0; i < matchedPcs.length - 1; i++) {
                    var mpc1 = matchedPcs[i];
                    for (var j = i + 1; j < matchedPcs.length; j++) {
                        var mpc2 = matchedPcs[j];
                        for (var k = 0; k < mpc1.length; k++) {
                            if (mpc1[k].__id !== mpc2[k].__id &&
                                mpc1[k].validator(args[k]) === mpc2[k].validator(args[k])) {
                                var mpc1name = mpc1[k].name || "declaration " + mpc1[k].__id,
                                    mpc2name = mpc2[k].name || "declaration " + mpc2[k].__id;
                                var err = "Argument " + k + " matches both " + mpc1name + " (" + mpc1[k].type + ") and " + mpc2name + " (" + mpc2[k].type + ")";
                                errs.push(err);
                            }
                        }
                    }
                }
                if (validators['function'](error)) error(Error(errs));
                else throw Error(errs);
            }
        };
    }

    function register(name, validator) {
        if (!validators.string(name))
            throw Error("'name' must be a string");
        if (!validators.function(validator))
            throw Error("'name' must be a function");
        validators[name] = validator;
    }

    getJudge.register = register;

    return getJudge;

}
