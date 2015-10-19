'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

var MergeAllOperator = (function () {
    function MergeAllOperator(concurrent) {
        _classCallCheck(this, MergeAllOperator);

        this.concurrent = concurrent;
    }

    MergeAllOperator.prototype.call = function call(observer) {
        return new MergeAllSubscriber(observer, this.concurrent);
    };

    return MergeAllOperator;
})();

exports.MergeAllOperator = MergeAllOperator;

var MergeAllSubscriber = (function (_OuterSubscriber) {
    _inherits(MergeAllSubscriber, _OuterSubscriber);

    function MergeAllSubscriber(destination, concurrent) {
        _classCallCheck(this, MergeAllSubscriber);

        _OuterSubscriber.call(this, destination);
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
    }

    MergeAllSubscriber.prototype._next = function _next(observable) {
        if (this.active < this.concurrent) {
            if (observable._isScalar) {
                this.destination.next(observable.value);
            } else {
                this.active++;
                this.add(_utilSubscribeToResult2['default'](this, observable));
            }
        } else {
            this.buffer.push(observable);
        }
    };

    MergeAllSubscriber.prototype._complete = function _complete() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };

    MergeAllSubscriber.prototype.notifyComplete = function notifyComplete(innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };

    return MergeAllSubscriber;
})(_OuterSubscriber3['default']);

exports.MergeAllSubscriber = MergeAllSubscriber;