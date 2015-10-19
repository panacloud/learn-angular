'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subscriber2 = require('./Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var OuterSubscriber = (function (_Subscriber) {
    _inherits(OuterSubscriber, _Subscriber);

    function OuterSubscriber() {
        _classCallCheck(this, OuterSubscriber);

        _Subscriber.apply(this, arguments);
    }

    OuterSubscriber.prototype.notifyComplete = function notifyComplete(inner) {
        this.destination.complete();
    };

    OuterSubscriber.prototype.notifyNext = function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        this.destination.next(innerValue);
    };

    OuterSubscriber.prototype.notifyError = function notifyError(error, inner) {
        this.destination.error(error);
    };

    return OuterSubscriber;
})(_Subscriber3['default']);

exports['default'] = OuterSubscriber;
module.exports = exports['default'];