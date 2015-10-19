'use strict';

exports.__esModule = true;
exports['default'] = isEmpty;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

function isEmpty() {
    return this.lift(new IsEmptyOperator());
}

var IsEmptyOperator = (function () {
    function IsEmptyOperator() {
        _classCallCheck(this, IsEmptyOperator);
    }

    IsEmptyOperator.prototype.call = function call(observer) {
        return new IsEmptySubscriber(observer);
    };

    return IsEmptyOperator;
})();

var IsEmptySubscriber = (function (_Subscriber) {
    _inherits(IsEmptySubscriber, _Subscriber);

    function IsEmptySubscriber(destination) {
        _classCallCheck(this, IsEmptySubscriber);

        _Subscriber.call(this, destination);
    }

    IsEmptySubscriber.prototype.notifyComplete = function notifyComplete(isEmpty) {
        var destination = this.destination;
        destination.next(isEmpty);
        destination.complete();
    };

    IsEmptySubscriber.prototype._next = function _next(value) {
        this.notifyComplete(false);
    };

    IsEmptySubscriber.prototype._complete = function _complete() {
        this.notifyComplete(true);
    };

    return IsEmptySubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];