'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilTryCatch = require('../../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../../util/errorObject');

var _utilBindCallback = require('../../util/bindCallback');

var _utilBindCallback2 = _interopRequireDefault(_utilBindCallback);

var FindValueOperator = (function () {
    function FindValueOperator(predicate, source, yieldIndex, thisArg) {
        _classCallCheck(this, FindValueOperator);

        this.predicate = predicate;
        this.source = source;
        this.yieldIndex = yieldIndex;
        this.thisArg = thisArg;
    }

    FindValueOperator.prototype.call = function call(observer) {
        return new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg);
    };

    return FindValueOperator;
})();

exports.FindValueOperator = FindValueOperator;

var FindValueSubscriber = (function (_Subscriber) {
    _inherits(FindValueSubscriber, _Subscriber);

    function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
        _classCallCheck(this, FindValueSubscriber);

        _Subscriber.call(this, destination);
        this.source = source;
        this.yieldIndex = yieldIndex;
        this.thisArg = thisArg;
        this.index = 0;
        if (typeof predicate === 'function') {
            this.predicate = _utilBindCallback2['default'](predicate, thisArg, 3);
        }
    }

    FindValueSubscriber.prototype.notifyComplete = function notifyComplete(value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
    };

    FindValueSubscriber.prototype._next = function _next(value) {
        var predicate = this.predicate;
        if (predicate === undefined) {
            this.destination.error(new TypeError('predicate must be a function'));
        }
        var index = this.index++;
        var result = _utilTryCatch2['default'](predicate)(value, index, this.source);
        if (result === _utilErrorObject.errorObject) {
            this.destination.error(result.e);
        } else if (result) {
            this.notifyComplete(this.yieldIndex ? index : value);
        }
    };

    FindValueSubscriber.prototype._complete = function _complete() {
        this.notifyComplete(this.yieldIndex ? -1 : undefined);
    };

    return FindValueSubscriber;
})(_Subscriber3['default']);

exports.FindValueSubscriber = FindValueSubscriber;