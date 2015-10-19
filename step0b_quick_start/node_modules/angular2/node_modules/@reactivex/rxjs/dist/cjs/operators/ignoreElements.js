'use strict';

exports.__esModule = true;
exports['default'] = ignoreElements;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
}

;

var IgnoreElementsOperator = (function () {
    function IgnoreElementsOperator() {
        _classCallCheck(this, IgnoreElementsOperator);
    }

    IgnoreElementsOperator.prototype.call = function call(subscriber) {
        return new IgnoreElementsSubscriber(subscriber);
    };

    return IgnoreElementsOperator;
})();

var IgnoreElementsSubscriber = (function (_Subscriber) {
    _inherits(IgnoreElementsSubscriber, _Subscriber);

    function IgnoreElementsSubscriber() {
        _classCallCheck(this, IgnoreElementsSubscriber);

        _Subscriber.apply(this, arguments);
    }

    IgnoreElementsSubscriber.prototype._next = function _next() {};

    return IgnoreElementsSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];