/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../../typings/rx/rx.all.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var lang_1 = require('angular2/src/facade/lang');
var Rx = require('rx');
exports.Promise = lang_1.global.Promise;
var PromiseWrapper = (function () {
    function PromiseWrapper() {
    }
    PromiseWrapper.resolve = function (obj) { return exports.Promise.resolve(obj); };
    PromiseWrapper.reject = function (obj, _) { return exports.Promise.reject(obj); };
    // Note: We can't rename this method into `catch`, as this is not a valid
    // method name in Dart.
    PromiseWrapper.catchError = function (promise, onError) {
        return promise.catch(onError);
    };
    PromiseWrapper.all = function (promises) {
        if (promises.length == 0)
            return exports.Promise.resolve([]);
        return exports.Promise.all(promises);
    };
    PromiseWrapper.then = function (promise, success, rejection) {
        return promise.then(success, rejection);
    };
    PromiseWrapper.completer = function () {
        var resolve;
        var reject;
        var p = new exports.Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        return { promise: p, resolve: resolve, reject: reject };
    };
    PromiseWrapper.isPromise = function (maybePromise) { return maybePromise instanceof exports.Promise; };
    return PromiseWrapper;
})();
exports.PromiseWrapper = PromiseWrapper;
var TimerWrapper = (function () {
    function TimerWrapper() {
    }
    TimerWrapper.setTimeout = function (fn, millis) { return lang_1.global.setTimeout(fn, millis); };
    TimerWrapper.clearTimeout = function (id) { lang_1.global.clearTimeout(id); };
    TimerWrapper.setInterval = function (fn, millis) { return lang_1.global.setInterval(fn, millis); };
    TimerWrapper.clearInterval = function (id) { lang_1.global.clearInterval(id); };
    return TimerWrapper;
})();
exports.TimerWrapper = TimerWrapper;
var ObservableWrapper = (function () {
    function ObservableWrapper() {
    }
    ObservableWrapper.subscribe = function (emitter, onNext, onThrow, onReturn) {
        if (onThrow === void 0) { onThrow = null; }
        if (onReturn === void 0) { onReturn = null; }
        return emitter.observer({ next: onNext, throw: onThrow, return: onReturn });
    };
    ObservableWrapper.isObservable = function (obs) { return obs instanceof Observable; };
    ObservableWrapper.dispose = function (subscription) { subscription.dispose(); };
    ObservableWrapper.callNext = function (emitter, value) { emitter.next(value); };
    ObservableWrapper.callThrow = function (emitter, error) { emitter.throw(error); };
    ObservableWrapper.callReturn = function (emitter) { emitter.return(null); };
    return ObservableWrapper;
})();
exports.ObservableWrapper = ObservableWrapper;
// TODO: vsavkin change to interface
var Observable = (function () {
    function Observable() {
    }
    Observable.prototype.observer = function (generator) { return null; };
    return Observable;
})();
exports.Observable = Observable;
/**
 * Use Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 */
var EventEmitter = (function (_super) {
    __extends(EventEmitter, _super);
    function EventEmitter() {
        _super.call(this);
        // System creates a different object for import * than Typescript es5 emit.
        if (Rx.hasOwnProperty('default')) {
            this._subject = new Rx.default.Rx.Subject();
            this._immediateScheduler = Rx.default.Rx.Scheduler.immediate;
        }
        else {
            this._subject = new Rx.Subject();
            this._immediateScheduler = Rx.Scheduler.immediate;
        }
    }
    EventEmitter.prototype.observer = function (generator) {
        return this._subject.observeOn(this._immediateScheduler)
            .subscribe(function (value) { setTimeout(function () { return generator.next(value); }); }, function (error) { return generator.throw ? generator.throw(error) : null; }, function () { return generator.return ? generator.return() : null; });
    };
    EventEmitter.prototype.toRx = function () { return this._subject; };
    EventEmitter.prototype.next = function (value) { this._subject.onNext(value); };
    EventEmitter.prototype.throw = function (error) { this._subject.onError(error); };
    EventEmitter.prototype.return = function (value) { this._subject.onCompleted(); };
    return EventEmitter;
})(Observable);
exports.EventEmitter = EventEmitter;
exports.__esModule = true;
//# sourceMappingURL=async.js.map