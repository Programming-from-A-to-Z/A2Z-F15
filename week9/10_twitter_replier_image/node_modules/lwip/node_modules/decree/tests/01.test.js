var should = require('should'),
    assert = require('assert'),
    decree = require('../');

describe('judge returns args', function() {

    var decs = [{
        type: 'string'
    }, {
        type: 'number'
    }, {
        type: 'hash'
    }];

    var judge = decree(decs);

    describe('with legal arguments', function() {

        var args = ['hello', 1, {
            a: 'b'
        }];
        it('should be ok', function() {
            args = judge(args);
            args[0].should.be.a.String;
            args[1].should.be.a.Number;
            args[2].should.be.an.Object;
        });

    });

    describe('with illegal arguments', function() {

        var args = [1, 1, {
            a: 'b'
        }];
        it('should throw an error', function() {
            judge.bind(null, args).should.throwError();
        });

    });

});

describe('judge with a callback', function() {

    var decs = [{
        type: 'string'
    }, {
        type: 'number'
    }, {
        type: 'hash'
    }];

    var judge = decree(decs);

    describe('with legal arguments', function() {

        var args = ['hello', 1, {
            a: 'b'
        }];
        it('should be ok', function() {
            var called = false;
            args = judge(args, function(a1, a2, a3) {
                called = true;
                a1.should.be.a.String;
                a2.should.be.a.Number;
                a3.should.be.an.Object;
            });
            called.should.be.true;
        });

    });

    describe('with illegal arguments', function() {

        var args = [1, 1, {
            a: 'b'
        }];
        it('should throw an error', function() {
            var called = false;
            judge.bind(null, args, function(a1, a2, a3) {
                called = true;
            }).should.throwError();
            called.should.be.false;
        });

    });

});

describe('judge with an error handling callback', function() {

    var decs = [{
        type: 'string'
    }, {
        type: 'number'
    }, {
        type: 'hash'
    }];

    var judge = decree(decs);

    describe('with legal arguments', function() {

        var args = ['hello', 1, {
            a: 'b'
        }];
        it('should be ok', function() {
            var cbCalled = false,
                errCbCalled = false;
            args = judge(args, function(a1, a2, a3) {
                cbCalled = true;
                a1.should.be.a.String;
                a2.should.be.a.Number;
                a3.should.be.an.Object;
            }, function(err) {
                errCbCalled = true;
            });
            cbCalled.should.be.true;
            errCbCalled.should.be.false;
        });

    });

    describe('with illegal arguments', function() {

        var args = [1, 1, {
            a: 'b'
        }];
        it('should call handler with an error', function() {
            var cbCalled = false,
                errCbCalled = false;
            judge(args, function(a1, a2, a3) {
                cbCalled = true;
            }, function(err) {
                errCbCalled = true;
                err.should.be.an.Error;
            });
            cbCalled.should.be.false;
            errCbCalled.should.be.true;
        });

    });

});

describe('arguments with default assignments modified by user', function() {

    var decs = [{
        type: 'hash',
        optional: true,
        default: {
            a: 'b'
        }
    }];

    var judge = decree(decs);

    it('should should not affect default value', function() {
        var called = false;
        judge([], function(a) {
            called = true;
            a.should.be.an.Object;
            assert(a.a === 'b');
            // modify a (should not modify the default value):
            a.a = 'c';
            assert(a.a === 'c');
        });
        called.should.be.true;
        called = false;
        judge([], function(a) {
            called = true;
            a.should.be.an.Object;
            assert(a.a === 'b'); // still 'b'
        });
        called.should.be.true;
        assert(decs[0].default.a === 'b');
    });

});

describe('one type per argument', function() {

    describe('3 args, none is optional', function() {

        var decs = [{
            type: 'string'
        }, {
            type: 'number'
        }, {
            type: 'hash'
        }];

        var judge = decree(decs);

        describe('function called with legal arguments', function() {

            var args = ['hello', 1, {
                a: 'b'
            }];
            it('should be ok', function() {
                var called = false;
                judge(args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.a.String;
                    a2.should.be.a.Number;
                    a3.should.be.an.Object;
                });
                called.should.be.true;
            });

        });

        describe('function called with illegal arguments', function() {

            describe('judge returns args', function() {

                describe('illegal first argument', function() {
                    var args = [1, 1, {
                        a: 'b'
                    }];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

                describe('illegal second argument', function() {
                    var args = ['hello', 'world', {
                        a: 'b'
                    }];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

                describe('illegal third argument', function() {
                    var args = ['hello', 1, 1];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

                describe('missing first argument', function() {
                    var args = [1, {
                        a: 'b'
                    }];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

                describe('missing second argument', function() {
                    var args = ['hello', {
                        a: 'b'
                    }];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

                describe('missing third argument', function() {
                    var args = ['hello', 1];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

                describe('missing all arguments', function() {
                    var args = [];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

            });

        });

    }); // none is optional

    describe('3 args, first and third are optional (with defaults)', function() {

        var decs = [{
            type: 'string',
            optional: true,
            default: 'hello'
        }, {
            type: 'number'
        }, {
            type: 'hash',
            optional: true,
            default: {
                a: 'b'
            }
        }];

        var judge = decree(decs);

        describe('function called with legal arguments', function() {

            describe('all arguments provided', function() {

                var args = ['hi', 10, {
                    a: 'c'
                }];
                it('should be ok', function() {
                    var called = false;
                    judge(args, function(a1, a2, a3) {
                        called = true;
                        assert(a1 === 'hi');
                        assert(a2 === 10);
                        a3.should.be.an.Object;
                        assert(a3.a === 'c');
                    });
                    called.should.be.true;
                });

            });

            describe('first argument missing', function() {

                var args = [10, {
                    a: 'c'
                }];
                it('should be ok', function() {
                    var called = false;
                    judge(args, function(a1, a2, a3) {
                        called = true;
                        assert(a1 === 'hello');
                        assert(a2 === 10);
                        a3.should.be.an.Object;
                        assert(a3.a === 'c');
                    });
                    called.should.be.true;
                });

            });

            describe('third argument missing', function() {

                var args = ['hi', 1];
                it('should be ok', function() {
                    var called = false;
                    judge(args, function(a1, a2, a3) {
                        called = true;
                        assert(a1 === 'hi');
                        assert(a2 === 1);
                        a3.should.be.an.Object;
                        assert(a3.a === 'b');
                    });
                    called.should.be.true;
                });

            });

            describe('first and third arguments missing', function() {

                var args = [1];
                it('should be ok', function() {
                    var called = false;
                    judge(args, function(a1, a2, a3) {
                        called = true;
                        assert(a1 === 'hello');
                        assert(a2 === 1);
                        a3.should.be.an.Object;
                        assert(a3.a === 'b');
                    });
                    called.should.be.true;
                });

            });

        });

        describe('function called with illegal arguments', function() {

            describe('first argument illegal', function() {

                var args = [1, 1, {
                    a: 'c'
                }];
                it('should throw an error', function() {
                    judge.bind(null, args).should.throwError();
                });

            });

            describe('third argument illegal', function() {

                var args = ['hi', 1, 6];
                it('should throw an error', function() {
                    judge.bind(null, args).should.throwError();
                });

            });

            describe('second argument missing', function() {

                var args = ['hi', {
                    a: 'c'
                }];
                it('should throw an error', function() {
                    judge.bind(null, args).should.throwError();
                });

            });

        });

    }); // first and third are optional (with defaults)

    describe('3 args, first and third are optional (without defaults)', function() {

        var decs = [{
            type: 'string',
            optional: true
        }, {
            type: 'number'
        }, {
            type: 'hash',
            optional: true
        }];

        var judge = decree(decs);

        describe('function called with legal arguments', function() {

            describe('all arguments provided', function() {

                var args = ['hi', 10, {
                    a: 'c'
                }];
                it('should be ok', function() {
                    var called = false;
                    judge(args, function(a1, a2, a3) {
                        called = true;
                        assert(a1 === 'hi');
                        assert(a2 === 10);
                        a3.should.be.an.Object;
                        assert(a3.a === 'c');
                    });
                    called.should.be.true;
                });

            });

            describe('first argument missing', function() {

                var args = [10, {
                    a: 'c'
                }];
                it('should be ok', function() {
                    var called = false;
                    judge(args, function(a1, a2, a3) {
                        called = true;
                        assert(a1 === undefined);
                        assert(a2 === 10);
                        a3.should.be.an.Object;
                        assert(a3.a === 'c');
                    });
                    called.should.be.true;
                });

            });

            describe('third argument missing', function() {

                var args = ['hi', 1];
                it('should be ok', function() {
                    var called = false;
                    judge(args, function(a1, a2, a3) {
                        called = true;
                        assert(a1 === 'hi');
                        assert(a2 === 1);
                        assert(a3 === undefined);
                    });
                    called.should.be.true;
                });

            });

            describe('first and third arguments missing', function() {

                var args = [1];
                it('should be ok', function() {
                    var called = false;
                    judge(args, function(a1, a2, a3) {
                        called = true;
                        assert(a1 === undefined);
                        assert(a2 === 1);
                        assert(a3 === undefined);
                    });
                    called.should.be.true;
                });

            });

        });

    }); // first and third are optional (without defaults)

}); // one type per argument

describe('multiple types per argument', function() {

    describe('3 args, none is optional', function() {

        var decs = [{
            types: ['string', 'hash']
        }, {
            types: ['array', 'hash']
        }, {
            types: ['string', 'function', 'number']
        }];

        var judge = decree(decs);

        describe('function called with legal arguments (1)', function() {

            var args = ['hello', [1, 2, 3], 'world'];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.a.String;
                    a2.should.be.an.Array;
                    a3.should.be.a.String;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (2)', function() {

            var args = ['hello', [1, 2, 3],
                function() {}
            ];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.a.String;
                    a2.should.be.an.Array;
                    a3.should.be.a.Function;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (3)', function() {

            var args = ['hello', [1, 2, 3], 1];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.a.String;
                    a2.should.be.an.Array;
                    a3.should.be.a.Number;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (4)', function() {

            var args = [{
                    a: 'b'
                },
                [1, 2, 3], 'world'
            ];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.an.Object;
                    a2.should.be.an.Array;
                    a3.should.be.a.String;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (5)', function() {

            var args = [{
                    a: 'b'
                },
                [1, 2, 3],
                function() {}
            ];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.an.Object;
                    a2.should.be.an.Array;
                    a3.should.be.a.Function;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (6)', function() {

            var args = [{
                    a: 'b'
                },
                [1, 2, 3], 1
            ];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.an.Object;
                    a2.should.be.an.Array;
                    a3.should.be.a.Number;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (7)', function() {

            var args = ['hello', {
                foo: 'bar'
            }, 'world'];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.a.String;
                    a2.should.be.an.Object;
                    a3.should.be.a.String;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (8)', function() {

            var args = ['hello', {
                    foo: 'bar'
                },
                function() {}
            ];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.a.String;
                    a2.should.be.an.Object;
                    a3.should.be.a.Function;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (9)', function() {

            var args = ['hello', {
                    foo: 'bar'
                },
                1
            ];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.a.String;
                    a2.should.be.an.Object;
                    a3.should.be.a.Number;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (10)', function() {

            var args = [{
                    a: 'b'
                }, {
                    foo: 'bar'
                },
                'world'
            ];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.an.Object;
                    a2.should.be.an.Object;
                    a3.should.be.a.String;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (11)', function() {

            var args = [{
                    a: 'b'
                }, {
                    foo: 'bar'
                },
                function() {}
            ];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.an.Object;
                    a2.should.be.an.Object;
                    a3.should.be.a.Function;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (12)', function() {

            var args = [{
                    a: 'b'
                }, {
                    foo: 'bar'
                },
                1
            ];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.an.Object;
                    a2.should.be.an.Object;
                    a3.should.be.a.Number;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with illegal arguments (1)', function() {

            var args = [1, [1, 2, 3], 1];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });

        });

        describe('function called with illegal arguments (2)', function() {

            var args = ['hello', 'world',
                function() {}
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });

        });

        describe('function called with illegal arguments (3)', function() {

            var args = ['hello', [1, 2, 3],
                [1, 2, 3]
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });

        });

        describe('function called with missing first argument', function() {

            var args = [
                [1, 2, 3], 'hello'
            ];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });

        });

        describe('function called with missing second argument', function() {

            var args = ['hello', -55];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });

        });

        describe('function called with missing third argument', function() {

            var args = ['hello', [1, 2, 3]];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });

        });

        describe('function called with no arguments', function() {

            var args = [];
            it('should not be ok', function() {
                judge.bind(null, args).should.throwError();
            });

        });

    }); //none is optional

    describe('3 args, first and second are optional (with defaults)', function() {

        var decs = [{
            types: ['string', 'hash'],
            optional: true,
            default: 'hello'
        }, {
            types: ['array', 'hash'],
            optional: true,
            default: [0, 9, 8]
        }, {
            types: ['string', 'function', 'number']
        }];

        var judge = decree(decs);

        describe('function called with legal arguments (1)', function() {

            var args = [{
                    a: 'b'
                }, {
                    a: 'b'
                },
                0.99
            ];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.an.Object;
                    a2.should.be.an.Object;
                    a3.should.be.a.Number;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (2)', function() {

            var args = [
                [1, 2, 3],
                function() {}
            ];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.a.String;
                    a2.should.be.an.Array;
                    a3.should.be.a.Function;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (3)', function() {

            var args = ['hello', 1];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.a.String;
                    a2.should.be.an.Array;
                    a3.should.be.a.Number;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with legal arguments (4)', function() {

            var args = [1];
            it('should be ok', function() {
                var called = false;
                judge.bind(null, args, function(a1, a2, a3) {
                    called = true;
                    a1.should.be.a.String;
                    a2.should.be.an.Array;
                    a3.should.be.a.Number;
                }).should.not.throwError();
                called.should.be.true;
            });

        });

        describe('function called with illegal arguments', function() {

            describe('ambiguity between first and second arguments', function() {

                var args = [{
                        a: 'b'
                    },
                    1
                ];
                it('should not be ok', function() {
                    judge.bind(null, args).should.throwError();
                });

            });

        });

    }); //first and third are optional (with defaults)

}); // multiple types per argument
