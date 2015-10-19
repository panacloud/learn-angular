'use strict';

exports.__esModule = true;
exports['default'] = _switch;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

function _switch() {
    return this.lift(new SwitchOperator());
}

var SwitchOperator = (function () {
    function SwitchOperator() {
        _classCallCheck(this, SwitchOperator);
    }

    SwitchOperator.prototype.call = function call(subscriber) {
        return new SwitchSubscriber(subscriber);
    };

    return SwitchOperator;
})();

var SwitchSubscriber = (function (_OuterSubscriber) {
    _inherits(SwitchSubscriber, _OuterSubscriber);

    function SwitchSubscriber(destination) {
        _classCallCheck(this, SwitchSubscriber);

        _OuterSubscriber.call(this, destination);
        this.active = 0;
        this.hasCompleted = false;
    }

    SwitchSubscriber.prototype._next = function _next(value) {
        this.unsubscribeInner();
        this.active++;
        this.add(this.innerSubscription = _utilSubscribeToResult2['default'](this, value));
    };

    SwitchSubscriber.prototype._complete = function _complete() {
        this.hasCompleted = true;
        if (this.active === 0) {
            this.destination.complete();
        }
    };

    SwitchSubscriber.prototype.unsubscribeInner = function unsubscribeInner() {
        this.active = this.active > 0 ? this.active - 1 : 0;
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
            this.remove(innerSubscription);
        }
    };

    SwitchSubscriber.prototype.notifyNext = function notifyNext(outerValue, innerValue) {
        this.destination.next(innerValue);
    };

    SwitchSubscriber.prototype.notifyError = function notifyError(err) {
        this.destination.error(err);
    };

    SwitchSubscriber.prototype.notifyComplete = function notifyComplete() {
        this.unsubscribeInner();
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };

    return SwitchSubscriber;
})(_OuterSubscriber3['default']);

module.exports = exports['default'];