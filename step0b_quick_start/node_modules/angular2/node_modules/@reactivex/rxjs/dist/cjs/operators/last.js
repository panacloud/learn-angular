'use strict';

exports.__esModule = true;
exports['default'] = last;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilEmptyError = require('../util/EmptyError');

var _utilEmptyError2 = _interopRequireDefault(_utilEmptyError);

function last(predicate, resultSelector, defaultValue) {
    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
}

var LastOperator = (function () {
    function LastOperator(predicate, resultSelector, defaultValue, source) {
        _classCallCheck(this, LastOperator);

        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }

    LastOperator.prototype.call = function call(observer) {
        return new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source);
    };

    return LastOperator;
})();

var LastSubscriber = (function (_Subscriber) {
    _inherits(LastSubscriber, _Subscriber);

    function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _classCallCheck(this, LastSubscriber);

        _Subscriber.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.hasValue = false;
        this.index = 0;
        if (typeof defaultValue !== 'undefined') {
            this.lastValue = defaultValue;
            this.hasValue = true;
        }
    }

    LastSubscriber.prototype._next = function _next(value) {
        var predicate = this.predicate;
        var resultSelector = this.resultSelector;
        var destination = this.destination;

        var index = this.index++;
        if (predicate) {
            var found = _utilTryCatch2['default'](predicate)(value, index, this.source);
            if (found === _utilErrorObject.errorObject) {
                destination.error(_utilErrorObject.errorObject.e);
                return;
            }
            if (found) {
                if (resultSelector) {
                    value = _utilTryCatch2['default'](resultSelector)(value, index);
                    if (value === _utilErrorObject.errorObject) {
                        destination.error(_utilErrorObject.errorObject.e);
                        return;
                    }
                }
                this.lastValue = value;
                this.hasValue = true;
            }
        } else {
            this.lastValue = value;
            this.hasValue = true;
        }
    };

    LastSubscriber.prototype._complete = function _complete() {
        var destination = this.destination;
        if (this.hasValue) {
            destination.next(this.lastValue);
            destination.complete();
        } else {
            destination.error(new _utilEmptyError2['default']());
        }
    };

    return LastSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];