'use strict';

exports.__esModule = true;
exports['default'] = switchMapTo;

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mergeMapToSupport = require('./mergeMapTo-support');

function switchMapTo(observable, projectResult) {
    return this.lift(new SwitchMapToOperator(observable, projectResult));
}

var SwitchMapToOperator = (function () {
    function SwitchMapToOperator(observable, resultSelector) {
        _classCallCheck(this, SwitchMapToOperator);

        this.observable = observable;
        this.resultSelector = resultSelector;
    }

    SwitchMapToOperator.prototype.call = function call(subscriber) {
        return new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector);
    };

    return SwitchMapToOperator;
})();

var SwitchMapToSubscriber = (function (_MergeMapToSubscriber) {
    _inherits(SwitchMapToSubscriber, _MergeMapToSubscriber);

    function SwitchMapToSubscriber(destination, observable, resultSelector) {
        _classCallCheck(this, SwitchMapToSubscriber);

        _MergeMapToSubscriber.call(this, destination, observable, resultSelector, 1);
    }

    return SwitchMapToSubscriber;
})(_mergeMapToSupport.MergeMapToSubscriber);

module.exports = exports['default'];