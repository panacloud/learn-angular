'use strict';

exports.__esModule = true;
exports['default'] = timeInterval;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _schedulersImmediate = require('../../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

function timeInterval() {
    var scheduler = arguments.length <= 0 || arguments[0] === undefined ? _schedulersImmediate2['default'] : arguments[0];

    return this.lift(new TimeIntervalOperator(scheduler));
}

var TimeInterval = function TimeInterval(value, interval) {
    _classCallCheck(this, TimeInterval);

    this.value = value;
    this.interval = interval;
};

exports.TimeInterval = TimeInterval;

;

var TimeIntervalOperator = (function () {
    function TimeIntervalOperator(scheduler) {
        _classCallCheck(this, TimeIntervalOperator);

        this.scheduler = scheduler;
    }

    TimeIntervalOperator.prototype.call = function call(observer) {
        return new TimeIntervalSubscriber(observer, this.scheduler);
    };

    return TimeIntervalOperator;
})();

var TimeIntervalSubscriber = (function (_Subscriber) {
    _inherits(TimeIntervalSubscriber, _Subscriber);

    function TimeIntervalSubscriber(destination, scheduler) {
        _classCallCheck(this, TimeIntervalSubscriber);

        _Subscriber.call(this, destination);
        this.scheduler = scheduler;
        this.lastTime = 0;
        this.lastTime = scheduler.now();
    }

    TimeIntervalSubscriber.prototype._next = function _next(value) {
        var now = this.scheduler.now();
        var span = now - this.lastTime;
        this.lastTime = now;
        this.destination.next(new TimeInterval(value, span));
    };

    return TimeIntervalSubscriber;
})(_Subscriber3['default']);