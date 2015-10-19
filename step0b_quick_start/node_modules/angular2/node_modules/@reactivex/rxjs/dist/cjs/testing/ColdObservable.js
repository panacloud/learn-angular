'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _SubscriptionLoggable = require('./SubscriptionLoggable');

var _SubscriptionLoggable2 = _interopRequireDefault(_SubscriptionLoggable);

var _utilApplyMixins = require('../util/applyMixins');

var _utilApplyMixins2 = _interopRequireDefault(_utilApplyMixins);

var ColdObservable = (function (_Observable) {
    _inherits(ColdObservable, _Observable);

    function ColdObservable(messages, scheduler) {
        _classCallCheck(this, ColdObservable);

        _Observable.call(this, function (subscriber) {
            var observable = this;
            var index = observable.logSubscribedFrame();
            subscriber.add(new _Subscription2['default'](function () {
                observable.logUnsubscribedFrame(index);
            }));
            observable.scheduleMessages(subscriber);
            return subscriber;
        });
        this.messages = messages;
        this.subscriptions = [];
        this.scheduler = scheduler;
    }

    ColdObservable.prototype.scheduleMessages = function scheduleMessages(subscriber) {
        var messagesLength = this.messages.length;
        for (var i = 0; i < messagesLength; i++) {
            var message = this.messages[i];
            subscriber.add(this.scheduler.schedule(function (_ref) {
                var message = _ref.message;
                var subscriber = _ref.subscriber;
                message.notification.observe(subscriber);
            }, message.frame, { message: message, subscriber: subscriber }));
        }
    };

    return ColdObservable;
})(_Observable3['default']);

exports['default'] = ColdObservable;

_utilApplyMixins2['default'](ColdObservable, [_SubscriptionLoggable2['default']]);
module.exports = exports['default'];