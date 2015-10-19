'use strict';

exports.__esModule = true;
exports['default'] = elementAt;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _utilArgumentOutOfRangeError = require('../../util/ArgumentOutOfRangeError');

var _utilArgumentOutOfRangeError2 = _interopRequireDefault(_utilArgumentOutOfRangeError);

function elementAt(index, defaultValue) {
    return this.lift(new ElementAtOperator(index, defaultValue));
}

var ElementAtOperator = (function () {
    function ElementAtOperator(index, defaultValue) {
        _classCallCheck(this, ElementAtOperator);

        this.index = index;
        this.defaultValue = defaultValue;
        if (index < 0) {
            throw new _utilArgumentOutOfRangeError2['default']();
        }
    }

    ElementAtOperator.prototype.call = function call(subscriber) {
        return new ElementAtSubscriber(subscriber, this.index, this.defaultValue);
    };

    return ElementAtOperator;
})();

var ElementAtSubscriber = (function (_Subscriber) {
    _inherits(ElementAtSubscriber, _Subscriber);

    function ElementAtSubscriber(destination, index, defaultValue) {
        _classCallCheck(this, ElementAtSubscriber);

        _Subscriber.call(this, destination);
        this.index = index;
        this.defaultValue = defaultValue;
    }

    ElementAtSubscriber.prototype._next = function _next(x) {
        if (this.index-- === 0) {
            this.destination.next(x);
            this.destination.complete();
        }
    };

    ElementAtSubscriber.prototype._complete = function _complete() {
        var destination = this.destination;
        if (this.index >= 0) {
            if (typeof this.defaultValue !== 'undefined') {
                destination.next(this.defaultValue);
            } else {
                destination.error(new _utilArgumentOutOfRangeError2['default']());
            }
        }
        destination.complete();
    };

    return ElementAtSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];