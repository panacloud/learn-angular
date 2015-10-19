'use strict';

exports.__esModule = true;

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

var ExpandOperator = (function () {
    function ExpandOperator(project) {
        var concurrent = arguments.length <= 1 || arguments[1] === undefined ? Number.POSITIVE_INFINITY : arguments[1];

        _classCallCheck(this, ExpandOperator);

        this.project = project;
        this.concurrent = concurrent;
    }

    ExpandOperator.prototype.call = function call(subscriber) {
        return new ExpandSubscriber(subscriber, this.project, this.concurrent);
    };

    return ExpandOperator;
})();

exports.ExpandOperator = ExpandOperator;

var ExpandSubscriber = (function (_OuterSubscriber) {
    _inherits(ExpandSubscriber, _OuterSubscriber);

    function ExpandSubscriber(destination, project) {
        var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

        _classCallCheck(this, ExpandSubscriber);

        _OuterSubscriber.call(this, destination);
        this.project = project;
        this.concurrent = concurrent;
        this.index = 0;
        this.active = 0;
        this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            this.buffer = [];
        }
    }

    ExpandSubscriber.prototype._next = function _next(value) {
        var index = this.index++;
        this.destination.next(value);
        if (this.active < this.concurrent) {
            var result = _utilTryCatch2['default'](this.project)(value, index);
            if (result === _utilErrorObject.errorObject) {
                this.destination.error(result.e);
            } else {
                if (result._isScalar) {
                    this._next(result.value);
                } else {
                    this.active++;
                    this.add(_utilSubscribeToResult2['default'](this, result, value, index));
                }
            }
        } else {
            this.buffer.push(value);
        }
    };

    ExpandSubscriber.prototype._complete = function _complete() {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };

    ExpandSubscriber.prototype.notifyComplete = function notifyComplete(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };

    ExpandSubscriber.prototype.notifyNext = function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        this._next(innerValue);
    };

    return ExpandSubscriber;
})(_OuterSubscriber3['default']);

exports.ExpandSubscriber = ExpandSubscriber;