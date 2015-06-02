/// <reference path="../../typings/jasmine/jasmine"/>
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var di_1 = require('angular2/di');
var test_injector_1 = require('./test_injector');
var test_injector_2 = require('./test_injector');
exports.inject = test_injector_2.inject;
function proxy() {
}
exports.proxy = proxy;
var _global = (typeof window === 'undefined' ? lang_1.global : window);
exports.afterEach = _global.afterEach;
exports.expect = _global.expect;
exports.IS_DARTIUM = false;
var AsyncTestCompleter = (function () {
    function AsyncTestCompleter(done) {
        this._done = done;
    }
    AsyncTestCompleter.prototype.done = function () { this._done(); };
    return AsyncTestCompleter;
})();
exports.AsyncTestCompleter = AsyncTestCompleter;
var jsmBeforeEach = _global.beforeEach;
var jsmDescribe = _global.describe;
var jsmDDescribe = _global.fdescribe;
var jsmXDescribe = _global.xdescribe;
var jsmIt = _global.it;
var jsmIIt = _global.fit;
var jsmXIt = _global.xit;
var runnerStack = [];
var inIt = false;
var testBindings;
var BeforeEachRunner = (function () {
    function BeforeEachRunner(parent) {
        this._fns = [];
        this._parent = parent;
    }
    BeforeEachRunner.prototype.beforeEach = function (fn) { this._fns.push(fn); };
    BeforeEachRunner.prototype.run = function (injector) {
        if (this._parent)
            this._parent.run(injector);
        this._fns.forEach(function (fn) { return fn.execute(injector); });
    };
    return BeforeEachRunner;
})();
// Reset the test bindings before each test
jsmBeforeEach(function () { testBindings = []; });
function _describe(jsmFn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var parentRunner = runnerStack.length === 0 ? null : runnerStack[runnerStack.length - 1];
    var runner = new BeforeEachRunner(parentRunner);
    runnerStack.push(runner);
    var suite = jsmFn.apply(void 0, args);
    runnerStack.pop();
    return suite;
}
function describe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return _describe.apply(void 0, [jsmDescribe].concat(args));
}
exports.describe = describe;
function ddescribe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return _describe.apply(void 0, [jsmDDescribe].concat(args));
}
exports.ddescribe = ddescribe;
function xdescribe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return _describe.apply(void 0, [jsmXDescribe].concat(args));
}
exports.xdescribe = xdescribe;
function beforeEach(fn) {
    if (runnerStack.length > 0) {
        // Inside a describe block, beforeEach() uses a BeforeEachRunner
        var runner = runnerStack[runnerStack.length - 1];
        if (!(fn instanceof test_injector_1.FunctionWithParamTokens)) {
            fn = test_injector_1.inject([], fn);
        }
        runner.beforeEach(fn);
    }
    else {
        // Top level beforeEach() are delegated to jasmine
        jsmBeforeEach(fn);
    }
}
exports.beforeEach = beforeEach;
/**
 * Allows overriding default bindings defined in test_injector.js.
 *
 * The given function must return a list of DI bindings.
 *
 * Example:
 *
 *   beforeEachBindings(() => [
 *     bind(Compiler).toClass(MockCompiler),
 *     bind(SomeToken).toValue(myValue),
 *   ]);
 */
function beforeEachBindings(fn) {
    jsmBeforeEach(function () {
        var bindings = fn();
        if (!bindings)
            return;
        testBindings = testBindings.concat(bindings);
    });
}
exports.beforeEachBindings = beforeEachBindings;
function _it(jsmFn, name, fn) {
    var runner = runnerStack[runnerStack.length - 1];
    jsmFn(name, function (done) {
        var async = false;
        var completerBinding = di_1.bind(AsyncTestCompleter)
            .toFactory(function () {
            // Mark the test as async when an AsyncTestCompleter is injected in an it()
            if (!inIt)
                throw new Error('AsyncTestCompleter can only be injected in an "it()"');
            async = true;
            return new AsyncTestCompleter(done);
        });
        var injector = test_injector_1.createTestInjector(testBindings.concat([completerBinding]));
        runner.run(injector);
        if (!(fn instanceof test_injector_1.FunctionWithParamTokens)) {
            fn = test_injector_1.inject([], fn);
        }
        inIt = true;
        fn.execute(injector);
        inIt = false;
        if (!async)
            done();
    });
}
function it(name, fn) {
    return _it(jsmIt, name, fn);
}
exports.it = it;
function xit(name, fn) {
    return _it(jsmXIt, name, fn);
}
exports.xit = xit;
function iit(name, fn) {
    return _it(jsmIIt, name, fn);
}
exports.iit = iit;
// Some Map polyfills don't polyfill Map.toString correctly, which
// gives us bad error messages in tests.
// The only way to do this in Jasmine is to monkey patch a method
// to the object :-(
Map.prototype['jasmineToString'] =
    function () {
        var m = this;
        if (!m) {
            return '' + m;
        }
        var res = [];
        m.forEach(function (v, k) { res.push(k + ":" + v); });
        return "{ " + res.join(',') + " }";
    };
_global.beforeEach(function () {
    jasmine.addMatchers({
        // Custom handler for Map as Jasmine does not support it yet
        toEqual: function (util, customEqualityTesters) {
            return {
                compare: function (actual, expected) {
                    return { pass: util.equals(actual, expected, [compareMap]) };
                }
            };
            function compareMap(actual, expected) {
                if (actual instanceof Map) {
                    var pass = actual.size === expected.size;
                    if (pass) {
                        actual.forEach(function (v, k) { pass = pass && util.equals(v, expected.get(k)); });
                    }
                    return pass;
                }
                else {
                    return undefined;
                }
            }
        },
        toBePromise: function () {
            return {
                compare: function (actual, expectedClass) {
                    var pass = typeof actual === 'object' && typeof actual.then === 'function';
                    return {
                        pass: pass,
                        get message() { return 'Expected ' + actual + ' to be a promise'; }
                    };
                }
            };
        },
        toBeAnInstanceOf: function () {
            return {
                compare: function (actual, expectedClass) {
                    var pass = typeof actual === 'object' && actual instanceof expectedClass;
                    return {
                        pass: pass,
                        get message() {
                            return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                        }
                    };
                }
            };
        },
        toHaveText: function () {
            return {
                compare: function (actual, expectedText) {
                    var actualText = elementText(actual);
                    return {
                        pass: actualText == expectedText,
                        get message() {
                            return 'Expected ' + actualText + ' to be equal to ' + expectedText;
                        }
                    };
                }
            };
        },
        toImplement: function () {
            return {
                compare: function (actualObject, expectedInterface) {
                    var objProps = Object.keys(actualObject.constructor.prototype);
                    var intProps = Object.keys(expectedInterface.prototype);
                    var missedMethods = [];
                    intProps.forEach(function (k) {
                        if (!actualObject.constructor.prototype[k])
                            missedMethods.push(k);
                    });
                    return {
                        pass: missedMethods.length == 0,
                        get message() {
                            return 'Expected ' + actualObject + ' to have the following methods: ' +
                                missedMethods.join(", ");
                        }
                    };
                }
            };
        }
    });
});
var SpyObject = (function () {
    function SpyObject(type) {
        if (type === void 0) { type = null; }
        if (type) {
            for (var prop in type.prototype) {
                var m = null;
                try {
                    m = type.prototype[prop];
                }
                catch (e) {
                }
                if (typeof m === 'function') {
                    this.spy(prop);
                }
            }
        }
    }
    SpyObject.prototype.spy = function (name) {
        if (!this[name]) {
            this[name] = this._createGuinnessCompatibleSpy(name);
        }
        return this[name];
    };
    SpyObject.stub = function (object, config, overrides) {
        if (object === void 0) { object = null; }
        if (config === void 0) { config = null; }
        if (overrides === void 0) { overrides = null; }
        if (!(object instanceof SpyObject)) {
            overrides = config;
            config = object;
            object = new SpyObject();
        }
        var m = collection_1.StringMapWrapper.merge(config, overrides);
        collection_1.StringMapWrapper.forEach(m, function (value, key) { object.spy(key).andReturn(value); });
        return object;
    };
    SpyObject.prototype.rttsAssert = function (value) { return true; };
    SpyObject.prototype._createGuinnessCompatibleSpy = function (name) {
        var newSpy = jasmine.createSpy(name);
        newSpy.andCallFake = newSpy.and.callFake;
        newSpy.andReturn = newSpy.and.returnValue;
        // return null by default to satisfy our rtts asserts
        newSpy.and.returnValue(null);
        return newSpy;
    };
    return SpyObject;
})();
exports.SpyObject = SpyObject;
function elementText(n) {
    var hasNodes = function (n) {
        var children = dom_adapter_1.DOM.childNodes(n);
        return children && children.length > 0;
    };
    if (n instanceof Array) {
        return n.map(function (nn) { return elementText(nn); }).join("");
    }
    if (dom_adapter_1.DOM.isCommentNode(n)) {
        return '';
    }
    if (dom_adapter_1.DOM.isElementNode(n) && dom_adapter_1.DOM.tagName(n) == 'CONTENT') {
        return elementText(Array.prototype.slice.apply(dom_adapter_1.DOM.getDistributedNodes(n)));
    }
    if (dom_adapter_1.DOM.hasShadowRoot(n)) {
        return elementText(dom_adapter_1.DOM.childNodesAsList(dom_adapter_1.DOM.getShadowRoot(n)));
    }
    if (hasNodes(n)) {
        return elementText(dom_adapter_1.DOM.childNodesAsList(n));
    }
    return dom_adapter_1.DOM.getText(n);
}
function isInInnerZone() {
    return lang_1.global.zone._innerZone === true;
}
exports.isInInnerZone = isInInnerZone;
exports.__esModule = true;
//# sourceMappingURL=test_lib.js.map