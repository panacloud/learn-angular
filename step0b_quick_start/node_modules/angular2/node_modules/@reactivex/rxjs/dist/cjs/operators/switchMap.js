'use strict';

exports.__esModule = true;
exports['default'] = switchMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}

var SwitchMapOperator = (function () {
    function SwitchMapOperator(project, resultSelector) {
        _classCallCheck(this, SwitchMapOperator);

        this.project = project;
        this.resultSelector = resultSelector;
    }

    SwitchMapOperator.prototype.call = function call(subscriber) {
        return new SwitchMapSubscriber(subscriber, this.project, this.resultSelector);
    };

    return SwitchMapOperator;
})();

var SwitchMapSubscriber = (function (_OuterSubscriber) {
    _inherits(SwitchMapSubscriber, _OuterSubscriber);

    function SwitchMapSubscriber(destination, project, resultSelector) {
        _classCallCheck(this, SwitchMapSubscriber);

        _OuterSubscriber.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.hasCompleted = false;
        this.index = 0;
    }

    SwitchMapSubscriber.prototype._next = function _next(value) {
        var index = this.index++;
        var destination = this.destination;
        var result = _utilTryCatch2['default'](this.project)(value, index);
        if (result === _utilErrorObject.errorObject) {
            destination.error(result.e);
        } else {
            var innerSubscription = this.innerSubscription;
            if (innerSubscription) {
                innerSubscription.unsubscribe();
            }
            this.add(this.innerSubscription = _utilSubscribeToResult2['default'](this, result, value, index));
        }
    };

    SwitchMapSubscriber.prototype._complete = function _complete() {
        var innerSubscription = this.innerSubscription;
        this.hasCompleted = true;
        if (!innerSubscription || innerSubscription.isUnsubscribed) {
            this.destination.complete();
        }
    };

    SwitchMapSubscriber.prototype.notifyComplete = function notifyComplete(innerSub) {
        this.remove(innerSub);
        var prevSubscription = this.innerSubscription;
        if (prevSubscription) {
            prevSubscription.unsubscribe();
        }
        this.innerSubscription = null;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };

    SwitchMapSubscriber.prototype.notifyError = function notifyError(err) {
        this.destination.error(err);
    };

    SwitchMapSubscriber.prototype.notifyNext = function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        var resultSelector = this.resultSelector;
        var destination = this.destination;

        if (resultSelector) {
            var result = _utilTryCatch2['default'](resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
            if (result === _utilErrorObject.errorObject) {
                destination.error(_utilErrorObject.errorObject.e);
            } else {
                destination.next(result);
            }
        } else {
            destination.next(innerValue);
        }
    };

    return SwitchMapSubscriber;
})(_OuterSubscriber3['default']);

module.exports = exports['default'];