'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

var _utilSymbol_iterator = require('../util/Symbol_iterator');

var _utilSymbol_iterator2 = _interopRequireDefault(_utilSymbol_iterator);

var isArray = Array.isArray;

var ZipOperator = (function () {
    function ZipOperator(project) {
        _classCallCheck(this, ZipOperator);

        this.project = project;
    }

    ZipOperator.prototype.call = function call(subscriber) {
        return new ZipSubscriber(subscriber, this.project);
    };

    return ZipOperator;
})();

exports.ZipOperator = ZipOperator;

var ZipSubscriber = (function (_Subscriber) {
    _inherits(ZipSubscriber, _Subscriber);

    function ZipSubscriber(destination, project) {
        var values = arguments.length <= 2 || arguments[2] === undefined ? Object.create(null) : arguments[2];

        _classCallCheck(this, ZipSubscriber);

        _Subscriber.call(this, destination);
        this.index = 0;
        this.iterators = [];
        this.active = 0;
        this.project = typeof project === 'function' ? project : null;
        this.values = values;
    }

    ZipSubscriber.prototype._next = function _next(value) {
        var iterators = this.iterators;
        var index = this.index++;
        if (isArray(value)) {
            iterators.push(new StaticArrayIterator(value));
        } else if (typeof value[_utilSymbol_iterator2['default']] === 'function') {
            iterators.push(new StaticIterator(value[_utilSymbol_iterator2['default']]()));
        } else {
            iterators.push(new ZipBufferIterator(this.destination, this, value, index));
        }
    };

    ZipSubscriber.prototype._complete = function _complete() {
        var values = this.values;
        var iterators = this.iterators;
        var len = iterators.length;
        this.active = len;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (iterator.stillUnsubscribed) {
                iterator.subscribe(iterator, i);
            } else {
                this.active--; // not an observable
            }
        }
    };

    ZipSubscriber.prototype.notifyInactive = function notifyInactive() {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    };

    ZipSubscriber.prototype.checkIterators = function checkIterators() {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        // abort if not all of them have values
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                return;
            }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            var result = iterator.next();
            // check to see if it's completed now that you've gotten
            // the next value.
            if (iterator.hasCompleted()) {
                shouldComplete = true;
            }
            if (result.done) {
                destination.complete();
                return;
            }
            args.push(result.value);
        }
        var project = this.project;
        if (project) {
            var result = _utilTryCatch2['default'](project).apply(this, args);
            if (result === _utilErrorObject.errorObject) {
                destination.error(_utilErrorObject.errorObject.e);
            } else {
                destination.next(result);
            }
        } else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    };

    return ZipSubscriber;
})(_Subscriber3['default']);

exports.ZipSubscriber = ZipSubscriber;

var StaticIterator = (function () {
    function StaticIterator(iterator) {
        _classCallCheck(this, StaticIterator);

        this.iterator = iterator;
        this.nextResult = iterator.next();
    }

    StaticIterator.prototype.hasValue = function hasValue() {
        return true;
    };

    StaticIterator.prototype.next = function next() {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    };

    StaticIterator.prototype.hasCompleted = function hasCompleted() {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
    };

    return StaticIterator;
})();

var StaticArrayIterator = (function () {
    function StaticArrayIterator(array) {
        _classCallCheck(this, StaticArrayIterator);

        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }

    StaticArrayIterator.prototype[_utilSymbol_iterator2['default']] = function () {
        return this;
    };

    StaticArrayIterator.prototype.next = function next(value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { done: true };
    };

    StaticArrayIterator.prototype.hasValue = function hasValue() {
        return this.array.length > this.index;
    };

    StaticArrayIterator.prototype.hasCompleted = function hasCompleted() {
        return this.array.length === this.index;
    };

    return StaticArrayIterator;
})();

var ZipBufferIterator = (function (_OuterSubscriber) {
    _inherits(ZipBufferIterator, _OuterSubscriber);

    function ZipBufferIterator(destination, parent, observable, index) {
        _classCallCheck(this, ZipBufferIterator);

        _OuterSubscriber.call(this, destination);
        this.parent = parent;
        this.observable = observable;
        this.index = index;
        this.stillUnsubscribed = true;
        this.buffer = [];
        this.isComplete = false;
    }

    ZipBufferIterator.prototype[_utilSymbol_iterator2['default']] = function () {
        return this;
    };

    // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
    //    this is legit because `next()` will never be called by a subscription in this case.

    ZipBufferIterator.prototype.next = function next() {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { done: true };
        } else {
            return { value: buffer.shift(), done: false };
        }
    };

    ZipBufferIterator.prototype.hasValue = function hasValue() {
        return this.buffer.length > 0;
    };

    ZipBufferIterator.prototype.hasCompleted = function hasCompleted() {
        return this.buffer.length === 0 && this.isComplete;
    };

    ZipBufferIterator.prototype.notifyComplete = function notifyComplete() {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        } else {
            this.destination.complete();
        }
    };

    ZipBufferIterator.prototype.notifyNext = function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    };

    ZipBufferIterator.prototype.subscribe = function subscribe(value, index) {
        this.add(_utilSubscribeToResult2['default'](this, this.observable, this, index));
    };

    return ZipBufferIterator;
})(_OuterSubscriber3['default']);