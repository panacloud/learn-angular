'use strict';

exports.__esModule = true;
exports['default'] = dematerialize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

function dematerialize() {
    return this.lift(new DeMaterializeOperator());
}

var DeMaterializeOperator = (function () {
    function DeMaterializeOperator() {
        _classCallCheck(this, DeMaterializeOperator);
    }

    DeMaterializeOperator.prototype.call = function call(subscriber) {
        return new DeMaterializeSubscriber(subscriber);
    };

    return DeMaterializeOperator;
})();

var DeMaterializeSubscriber = (function (_Subscriber) {
    _inherits(DeMaterializeSubscriber, _Subscriber);

    function DeMaterializeSubscriber(destination) {
        _classCallCheck(this, DeMaterializeSubscriber);

        _Subscriber.call(this, destination);
    }

    DeMaterializeSubscriber.prototype._next = function _next(value) {
        value.observe(this.destination);
    };

    return DeMaterializeSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];