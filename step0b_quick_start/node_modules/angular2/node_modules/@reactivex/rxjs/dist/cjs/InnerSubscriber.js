'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subscriber2 = require('./Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var InnerSubscriber = (function (_Subscriber) {
    _inherits(InnerSubscriber, _Subscriber);

    function InnerSubscriber(parent, outerValue, outerIndex) {
        _classCallCheck(this, InnerSubscriber);

        _Subscriber.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }

    InnerSubscriber.prototype._next = function _next(value) {
        var index = this.index++;
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, index);
    };

    InnerSubscriber.prototype._error = function _error(error) {
        this.parent.notifyError(error, this);
    };

    InnerSubscriber.prototype._complete = function _complete() {
        this.parent.notifyComplete(this);
    };

    return InnerSubscriber;
})(_Subscriber3['default']);

exports['default'] = InnerSubscriber;
module.exports = exports['default'];