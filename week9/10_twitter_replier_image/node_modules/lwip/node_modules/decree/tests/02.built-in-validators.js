var should = require('should'),
    assert = require('assert'),
    decree = require('../');

describe('built-in validators', function() {

    describe('*', function() {

        var judge = decree([{
            type: '*'
        }]);

        describe('with legal arguments (1)', function() {
            var args = ['hello'];
            it('should be ok', function() {
                judge(args)[0].should.be.a.String;
            });
        });

        describe('with legal arguments (2)', function() {
            var args = [1];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (3)', function() {
            var args = [1.1];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (4)', function() {
            var args = [{
                a: 'b'
            }];
            it('should be ok', function() {
                judge(args)[0].should.be.an.Object;
            });
        });

        describe('with legal arguments (5)', function() {
            var args = [

                function() {}
            ];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Function;
            });
        });

        describe('with legal arguments (6)', function() {
            var args = [false];
            it('should be ok', function() {
                judge(args)[0].should.be.false;
            });
        });

        describe('with legal arguments (7)', function() {
            var args = [null];
            it('should be ok', function() {
                assert(judge(args)[0] === null);
            });
        });

        describe('with legal arguments (8)', function() {
            var args = [undefined];
            it('should be ok', function() {
                assert(judge(args)[0] === undefined);
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('array', function() {

        var judge = decree([{
            type: 'array'
        }]);

        describe('with legal arguments', function() {
            var args = [
                ['hello', 2, 3]
            ];
            it('should be ok', function() {
                judge(args)[0].should.be.an.Array;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [1.1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('function', function() {

        var judge = decree([{
            type: 'function'
        }]);

        describe('with legal arguments', function() {
            var args = [

                function() {}
            ];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Function;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [1.1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('hash', function() {

        var judge = decree([{
            type: 'hash'
        }]);

        describe('with legal arguments', function() {
            var args = [{
                a: 'b'
            }];
            it('should be ok', function() {
                judge(args)[0].should.be.an.Object;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [1.1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('string', function() {

        var judge = decree([{
            type: 'string'
        }]);

        describe('with legal arguments', function() {
            var args = ['hello'];
            it('should be ok', function() {
                judge(args)[0].should.be.a.String;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [1.1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('regexp', function() {

        var judge = decree([{
            type: 'regexp'
        }]);

        describe('with legal arguments', function() {
            var args = [/.*/];
            it('should be ok', function() {
                judge(args)[0].should.be.a.RegExp;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [1.1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('date', function() {

        var judge = decree([{
            type: 'date'
        }]);

        describe('with legal arguments', function() {
            var args = [new Date()];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Date;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [1.1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('boolean', function() {

        var judge = decree([{
            type: 'boolean'
        }]);

        describe('with legal arguments (1)', function() {
            var args = [true];
            it('should be ok', function() {
                judge(args)[0].should.be.true;
            });
        });

        describe('with legal arguments (2)', function() {
            var args = [false];
            it('should be ok', function() {
                judge(args)[0].should.be.false;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [1.1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('number', function() {

        var judge = decree([{
            type: 'number'
        }]);

        describe('with legal arguments (1)', function() {
            var args = [-123.123];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (2)', function() {
            var args = [0];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (3)', function() {
            var args = [1];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (4)', function() {
            var args = [123.123];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [true];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('p-number', function() {

        var judge = decree([{
            type: 'p-number'
        }]);

        describe('with legal arguments (1)', function() {
            var args = [123.123];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (2)', function() {
            var args = [1];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [0];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [-10];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [true];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (9)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (10)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('n-number', function() {

        var judge = decree([{
            type: 'n-number'
        }]);

        describe('with legal arguments (1)', function() {
            var args = [-123.123];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (2)', function() {
            var args = [-1];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [0];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [10];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [true];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (9)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (10)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('np-number', function() {

        var judge = decree([{
            type: 'np-number'
        }]);

        describe('with legal arguments (1)', function() {
            var args = [-123.123];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (2)', function() {
            var args = [0];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (3)', function() {
            var args = [-1];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [10];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [true];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (9)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('nn-number', function() {

        var judge = decree([{
            type: 'nn-number'
        }]);

        describe('with legal arguments (1)', function() {
            var args = [123.123];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (2)', function() {
            var args = [0];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (3)', function() {
            var args = [1];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [-10];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [true];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (9)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('int', function() {

        var judge = decree([{
            type: 'int'
        }]);

        describe('with legal arguments (1)', function() {
            var args = [-123];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (2)', function() {
            var args = [0];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (3)', function() {
            var args = [1];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (4)', function() {
            var args = [123];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [true];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('p-int', function() {

        var judge = decree([{
            type: 'p-int'
        }]);

        describe('with legal arguments (1)', function() {
            var args = [123];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (2)', function() {
            var args = [1];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [0];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [-10];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [10.5];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [-10.5];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (9)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (10)', function() {
            var args = [true];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (11)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (12)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('n-int', function() {

        var judge = decree([{
            type: 'n-int'
        }]);

        describe('with legal arguments (1)', function() {
            var args = [-123];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (2)', function() {
            var args = [-1];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [0];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [10];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [10.5];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = [-10.5];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (9)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (10)', function() {
            var args = [true];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (11)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (12)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('np-int', function() {

        var judge = decree([{
            type: 'np-int'
        }]);

        describe('with legal arguments (1)', function() {
            var args = [-123];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (2)', function() {
            var args = [0];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (3)', function() {
            var args = [-1];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [10];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [-10.5];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [true];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (9)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (10)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

    describe('nn-int', function() {

        var judge = decree([{
            type: 'nn-int'
        }]);

        describe('with legal arguments (1)', function() {
            var args = [123];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (2)', function() {
            var args = [0];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with legal arguments (3)', function() {
            var args = [1];
            it('should be ok', function() {
                judge(args)[0].should.be.a.Number;
            });
        });

        describe('with illegal arguments (1)', function() {
            var args = [-10];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (2)', function() {
            var args = [10.5];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (3)', function() {
            var args = [{
                a: 'b'
            }];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (4)', function() {
            var args = ['hello'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (5)', function() {
            var args = [

                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (6)', function() {
            var args = [
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (7)', function() {
            var args = [false];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (8)', function() {
            var args = [true];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (9)', function() {
            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with illegal arguments (10)', function() {
            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

        describe('with missing argument', function() {
            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });
        });

    });

});
