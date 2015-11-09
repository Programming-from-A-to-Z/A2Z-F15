var should = require('should'),
    assert = require('assert'),
    decree = require('../');

describe('registering custom types', function() {

    describe('invalid name (1)', function() {
        it('should not be ok', function() {
            decree.register.bind(decree, 123, function(o) {}).should.throwError();
        });
    });

    describe('invalid name (2)', function() {
        it('should not be ok', function() {
            decree.register.bind(decree, function(){}, function(o) {}).should.throwError();
        });
    });

    describe('invalid name (3)', function() {
        it('should not be ok', function() {
            decree.register.bind(decree, null, function(o) {}).should.throwError();
        });
    });

    describe('invalid name (4)', function() {
        it('should not be ok', function() {
            decree.register.bind(decree, undefined, function(o) {}).should.throwError();
        });
    });

    describe('invalid validator (1)', function() {
        it('should not be ok', function() {
            decree.register.bind(decree, "type", "foo").should.throwError();
        });
    });

    describe('invalid validator (2)', function() {
        it('should not be ok', function() {
            decree.register.bind(decree, "type", null).should.throwError();
        });
    });

    describe('invalid validator (3)', function() {
        it('should not be ok', function() {
            decree.register.bind(decree, "type", undefined).should.throwError();
        });
    });

});

describe('custom types validators', function() {

    describe('the strings "foo" or "bar"', function() {

        decree.register('type1', function(o) {
            return ["foo", "bar"].indexOf(o) !== -1;
        });

        var decs = [{
            type: 'type1',
            optional: true,
            default: "baz"
        }];

        var judge = decree(decs);

        describe('invalid argument (1)', function() {

            var args = ['bla'];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });

        });

        describe('invalid argument (2)', function() {

            var args = [1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });

        });

        describe('invalid argument (3)', function() {

            var args = [null];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });

        });

        describe('invalid argument (4)', function() {

            var args = [undefined];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });

        });

        describe('valid argument (1)', function() {

            var args = ['foo'];
            it('should be ok', function() {
                var called = false;
                judge(args, function(a) {
                    called = true;
                    assert(a === 'foo');
                });
                called.should.be.true;
            });

        });

        describe('valid argument (2)', function() {

            var args = ['bar'];
            it('should be ok', function() {
                var called = false;
                judge(args, function(a) {
                    called = true;
                    assert(a === 'bar');
                });
                called.should.be.true;
            });

        });

        describe('missing argument', function() {

            var args = [];
            it('should be ok', function() {
                var called = false;
                judge(args, function(a) {
                    called = true;
                    assert(a === 'baz');
                });
                called.should.be.true;
            });

        });

    });

});
