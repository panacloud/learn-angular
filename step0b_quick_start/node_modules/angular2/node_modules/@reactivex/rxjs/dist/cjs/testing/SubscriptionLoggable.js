'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _SubscriptionLog = require('./SubscriptionLog');

var _SubscriptionLog2 = _interopRequireDefault(_SubscriptionLog);

var SubscriptionLoggable = (function () {
    function SubscriptionLoggable() {
        _classCallCheck(this, SubscriptionLoggable);

        this.subscriptions = [];
    }

    SubscriptionLoggable.prototype.logSubscribedFrame = function logSubscribedFrame() {
        this.subscriptions.push(new _SubscriptionLog2['default'](this.scheduler.now()));
        return this.subscriptions.length - 1;
    };

    SubscriptionLoggable.prototype.logUnsubscribedFrame = function logUnsubscribedFrame(index) {
        var subscriptionLogs = this.subscriptions;
        var oldSubscriptionLog = subscriptionLogs[index];
        subscriptionLogs[index] = new _SubscriptionLog2['default'](oldSubscriptionLog.subscribedFrame, this.scheduler.now());
    };

    return SubscriptionLoggable;
})();

exports['default'] = SubscriptionLoggable;
module.exports = exports['default'];