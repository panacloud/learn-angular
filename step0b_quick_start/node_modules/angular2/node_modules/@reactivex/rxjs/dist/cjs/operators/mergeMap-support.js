'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var MergeMapOperator = (function () {
    function MergeMapOperator(project, resultSelector) {
        var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

        _classCallCheck(this, MergeMapOperator);

        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }

    MergeMapOperator.prototype.call = function call(observer) {
        return new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent);
    };

    return MergeMapOperator;
})();

exports.MergeMapOperator = MergeMapOperator;

var MergeMapSubscriber = (function (_OuterSubscriber) {
    _inherits(MergeMapSubscriber, _OuterSubscriber);

    function MergeMapSubscriber(destination, project, resultSelector) {
        var concurrent = arguments.length <= 3 || arguments[3] === undefined ? Number.POSITIVE_INFINITY : arguments[3];

        _classCallCheck(this, MergeMapSubscriber);

        _OuterSubscriber.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }

    MergeMapSubscriber.prototype._next = function _next(value) {
        if (this.active < this.concurrent) {
            var resultSelector = this.resultSelector;
            var index = this.index++;
            var ish = _utilTryCatch2['default'](this.project)(value, index);
            var destination = this.destination;
            if (ish === _utilErrorObject.errorObject) {
                destination.error(ish.e);
            } else {
                this.active++;
                this._innerSub(ish, value, index);
            }
        } else {
            this.buffer.push(value);
        }
    };

    MergeMapSubscriber.prototype._innerSub = function _innerSub(ish, value, index) {
        this.add(_utilSubscribeToResult2['default'](this, ish, value, index));
    };

    MergeMapSubscriber.prototype._complete = function _complete() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };

    MergeMapSubscriber.prototype.notifyNext = function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        var destination = this.destination;
        var resultSelector = this.resultSelector;

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

    MergeMapSubscriber.prototype.notifyComplete = function notifyComplete(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };

    return MergeMapSubscriber;
})(_OuterSubscriber3['default']);

exports.MergeMapSubscriber = MergeMapSubscriber;