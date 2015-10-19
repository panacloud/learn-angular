'use strict';

exports.__esModule = true;
exports['default'] = single;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilBindCallback = require('../util/bindCallback');

var _utilBindCallback2 = _interopRequireDefault(_utilBindCallback);

var _utilEmptyError = require('../util/EmptyError');

var _utilEmptyError2 = _interopRequireDefault(_utilEmptyError);

function single(predicate, thisArg) {
    return this.lift(new SingleOperator(predicate, thisArg, this));
}

var SingleOperator = (function () {
    function SingleOperator(predicate, thisArg, source) {
        _classCallCheck(this, SingleOperator);

        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }

    SingleOperator.prototype.call = function call(subscriber) {
        return new SingleSubscriber(subscriber, this.predicate, this.thisArg, this.source);
    };

    return SingleOperator;
})();

var SingleSubscriber = (function (_Subscriber) {
    _inherits(SingleSubscriber, _Subscriber);

    function SingleSubscriber(destination, predicate, thisArg, source) {
        _classCallCheck(this, SingleSubscriber);

        _Subscriber.call(this, destination);
        this.thisArg = thisArg;
        this.source = source;
        this.seenValue = false;
        this.index = 0;
        if (typeof predicate === 'function') {
            this.predicate = _utilBindCallback2['default'](predicate, thisArg, 3);
        }
    }

    SingleSubscriber.prototype.applySingleValue = function applySingleValue(value) {
        if (this.seenValue) {
            this.destination.error('Sequence contains more than one element');
        } else {
            this.seenValue = true;
            this.singleValue = value;
        }
    };

    SingleSubscriber.prototype._next = function _next(value) {
        var predicate = this.predicate;
        var currentIndex = this.index++;
        if (predicate) {
            var result = _utilTryCatch2['default'](predicate)(value, currentIndex, this.source);
            if (result === _utilErrorObject.errorObject) {
                this.destination.error(result.e);
            } else if (result) {
                this.applySingleValue(value);
            }
        } else {
            this.applySingleValue(value);
        }
    };

    SingleSubscriber.prototype._complete = function _complete() {
        var destination = this.destination;
        if (this.index > 0) {
            destination.next(this.seenValue ? this.singleValue : undefined);
            destination.complete();
        } else {
            destination.error(new _utilEmptyError2['default']());
        }
    };

    return SingleSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];