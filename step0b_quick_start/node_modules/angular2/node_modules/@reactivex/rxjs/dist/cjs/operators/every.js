'use strict';

exports.__esModule = true;
exports['default'] = every;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _observablesScalarObservable = require('../observables/ScalarObservable');

var _observablesScalarObservable2 = _interopRequireDefault(_observablesScalarObservable);

var _observablesArrayObservable = require('../observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _observablesErrorObservable = require('../observables/ErrorObservable');

var _observablesErrorObservable2 = _interopRequireDefault(_observablesErrorObservable);

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilBindCallback = require('../util/bindCallback');

var _utilBindCallback2 = _interopRequireDefault(_utilBindCallback);

function every(predicate, thisArg) {
    var source = this;
    var result = undefined;
    if (source._isScalar) {
        result = _utilTryCatch2['default'](predicate)(source.value, 0, source);
        if (result === _utilErrorObject.errorObject) {
            return new _observablesErrorObservable2['default'](_utilErrorObject.errorObject.e, source.scheduler);
        } else {
            return new _observablesScalarObservable2['default'](result, source.scheduler);
        }
    }
    if (source instanceof _observablesArrayObservable2['default']) {
        var array = source.array;
        var _result = _utilTryCatch2['default'](function (array, predicate) {
            return array.every(predicate);
        })(array, predicate);
        if (_result === _utilErrorObject.errorObject) {
            return new _observablesErrorObservable2['default'](_utilErrorObject.errorObject.e, source.scheduler);
        } else {
            return new _observablesScalarObservable2['default'](_result, source.scheduler);
        }
    }
    return source.lift(new EveryOperator(predicate, thisArg, source));
}

var EveryOperator = (function () {
    function EveryOperator(predicate, thisArg, source) {
        _classCallCheck(this, EveryOperator);

        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }

    EveryOperator.prototype.call = function call(observer) {
        return new EverySubscriber(observer, this.predicate, this.thisArg, this.source);
    };

    return EveryOperator;
})();

var EverySubscriber = (function (_Subscriber) {
    _inherits(EverySubscriber, _Subscriber);

    function EverySubscriber(destination, predicate, thisArg, source) {
        _classCallCheck(this, EverySubscriber);

        _Subscriber.call(this, destination);
        this.thisArg = thisArg;
        this.source = source;
        this.predicate = undefined;
        this.index = 0;
        if (typeof predicate === 'function') {
            this.predicate = _utilBindCallback2['default'](predicate, thisArg, 3);
        }
    }

    EverySubscriber.prototype.notifyComplete = function notifyComplete(everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    };

    EverySubscriber.prototype._next = function _next(value) {
        var predicate = this.predicate;
        if (predicate === undefined) {
            this.destination.error(new TypeError('predicate must be a function'));
        }
        var result = _utilTryCatch2['default'](predicate)(value, this.index++, this.source);
        if (result === _utilErrorObject.errorObject) {
            this.destination.error(result.e);
        } else if (!result) {
            this.notifyComplete(false);
        }
    };

    EverySubscriber.prototype._complete = function _complete() {
        this.notifyComplete(true);
    };

    return EverySubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];