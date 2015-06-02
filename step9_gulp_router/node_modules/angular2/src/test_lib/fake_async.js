/// <reference path="../../typings/jasmine/jasmine"/>
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var _scheduler;
var _microtasks = [];
var _pendingPeriodicTimers = [];
var _pendingTimers = [];
var _error = null;
/**
 * Wraps a function to be executed in the fakeAsync zone:
 * - microtasks are manually executed by calling `flushMicrotasks()`,
 * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception will be thrown.
 *
 * @param fn
 * @returns {Function} The function wrapped to be executed in the fakeAsync zone
 */
function fakeAsync(fn) {
    // TODO(vicb) re-enable once the jasmine patch from zone.js is applied
    // if (global.zone._inFakeAsyncZone) {
    //  throw new Error('fakeAsync() calls can not be nested');
    //}
    var fakeAsyncZone = lang_1.global.zone.fork({
        setTimeout: _setTimeout,
        clearTimeout: _clearTimeout,
        setInterval: _setInterval,
        clearInterval: _clearInterval,
        scheduleMicrotask: _scheduleMicrotask,
        _inFakeAsyncZone: true
    });
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        // TODO(tbosch): This class should already be part of the jasmine typings but it is not...
        _scheduler = new jasmine.DelayedFunctionScheduler();
        collection_1.ListWrapper.clear(_microtasks);
        collection_1.ListWrapper.clear(_pendingPeriodicTimers);
        collection_1.ListWrapper.clear(_pendingTimers);
        var res = fakeAsyncZone.run(function () { var res = fn.apply(void 0, args); });
        if (_pendingPeriodicTimers.length > 0) {
            throw new lang_1.BaseException(_pendingPeriodicTimers.length + " periodic timer(s) still in the queue.");
        }
        if (_pendingTimers.length > 0) {
            throw new lang_1.BaseException(_pendingTimers.length + " timer(s) still in the queue.");
        }
        _scheduler = null;
        collection_1.ListWrapper.clear(_microtasks);
        return res;
    };
}
exports.fakeAsync = fakeAsync;
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * @param {number} millis Number of millisecond, defaults to 0
 */
function tick(millis) {
    if (millis === void 0) { millis = 0; }
    _assertInFakeAsyncZone();
    flushMicrotasks();
    _scheduler.tick(millis);
}
exports.tick = tick;
/**
 * Flush any pending microtasks.
 */
function flushMicrotasks() {
    _assertInFakeAsyncZone();
    while (_microtasks.length > 0) {
        var microtask = collection_1.ListWrapper.removeAt(_microtasks, 0);
        microtask();
    }
}
exports.flushMicrotasks = flushMicrotasks;
function _setTimeout(fn, delay) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var cb = _fnAndFlush(fn);
    var id = _scheduler.scheduleFunction(cb, delay, args);
    collection_1.ListWrapper.push(_pendingTimers, id);
    _scheduler.scheduleFunction(_dequeueTimer(id), delay);
    return id;
}
function _clearTimeout(id) {
    _dequeueTimer(id);
    return _scheduler.removeFunctionWithId(id);
}
function _setInterval(fn, interval) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var cb = _fnAndFlush(fn);
    var id = _scheduler.scheduleFunction(cb, interval, args, true);
    _pendingPeriodicTimers.push(id);
    return id;
}
function _clearInterval(id) {
    collection_1.ListWrapper.remove(_pendingPeriodicTimers, id);
    return _scheduler.removeFunctionWithId(id);
}
function _fnAndFlush(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        fn.apply(lang_1.global, args);
        flushMicrotasks();
    };
}
function _scheduleMicrotask(microtask) {
    collection_1.ListWrapper.push(_microtasks, microtask);
}
function _dequeueTimer(id) {
    return function () { collection_1.ListWrapper.remove(_pendingTimers, id); };
}
function _assertInFakeAsyncZone() {
    if (!lang_1.global.zone._inFakeAsyncZone) {
        throw new Error('The code should be running in the fakeAsync zone to call this function');
    }
}
exports.__esModule = true;
//# sourceMappingURL=fake_async.js.map