'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = timeoutWith;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _schedulersImmediate = require('../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

var _utilIsDate = require('../util/isDate');

var _utilIsDate2 = _interopRequireDefault(_utilIsDate);

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

function timeoutWith(due, withObservable) {
    var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _schedulersImmediate2['default'] : arguments[2];

    var absoluteTimeout = _utilIsDate2['default'](due);
    var waitFor = absoluteTimeout ? +due - scheduler.now() : due;
    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
}

var TimeoutWithOperator = (function () {
    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
        _classCallCheck(this, TimeoutWithOperator);

        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
    }

    TimeoutWithOperator.prototype.call = function call(subscriber) {
        return new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler);
    };

    return TimeoutWithOperator;
})();

var TimeoutWithSubscriber = (function (_OuterSubscriber) {
    _inherits(TimeoutWithSubscriber, _OuterSubscriber);

    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        _classCallCheck(this, TimeoutWithSubscriber);

        _OuterSubscriber.call(this, destination);
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
        this.timeoutSubscription = undefined;
        this.timedOut = false;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        this.scheduleTimeout();
    }

    TimeoutWithSubscriber.dispatchTimeout = function dispatchTimeout(state) {
        var source = state.subscriber;
        var currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
            source.handleTimeout();
        }
    };

    TimeoutWithSubscriber.prototype.scheduleTimeout = function scheduleTimeout() {
        var currentIndex = this.index;
        var timeoutState = { subscriber: this, index: currentIndex };
        this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
        this.index++;
        this._previousIndex = currentIndex;
    };

    TimeoutWithSubscriber.prototype._next = function _next(value) {
        if (!this.timedOut) {
            this.destination.next(value);
            if (!this.absoluteTimeout) {
                this.scheduleTimeout();
            }
        }
    };

    TimeoutWithSubscriber.prototype._error = function _error(err) {
        if (!this.timedOut) {
            this.destination.error(err);
            this._hasCompleted = true;
        }
    };

    TimeoutWithSubscriber.prototype._complete = function _complete() {
        if (!this.timedOut) {
            this.destination.complete();
            this._hasCompleted = true;
        }
    };

    TimeoutWithSubscriber.prototype.handleTimeout = function handleTimeout() {
        var withObservable = this.withObservable;
        this.timedOut = true;
        this.add(this.timeoutSubscription = _utilSubscribeToResult2['default'](this, withObservable));
    };

    _createClass(TimeoutWithSubscriber, [{
        key: 'previousIndex',
        get: function get() {
            return this._previousIndex;
        }
    }, {
        key: 'hasCompleted',
        get: function get() {
            return this._hasCompleted;
        }
    }]);

    return TimeoutWithSubscriber;
})(_OuterSubscriber3['default']);

module.exports = exports['default'];