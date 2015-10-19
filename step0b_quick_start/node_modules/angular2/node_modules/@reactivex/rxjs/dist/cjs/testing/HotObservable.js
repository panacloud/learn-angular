'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subject2 = require('../Subject');

var _Subject3 = _interopRequireDefault(_Subject2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _SubscriptionLoggable = require('./SubscriptionLoggable');

var _SubscriptionLoggable2 = _interopRequireDefault(_SubscriptionLoggable);

var _utilApplyMixins = require('../util/applyMixins');

var _utilApplyMixins2 = _interopRequireDefault(_utilApplyMixins);

var HotObservable = (function (_Subject) {
    _inherits(HotObservable, _Subject);

    function HotObservable(messages, scheduler) {
        _classCallCheck(this, HotObservable);

        _Subject.call(this);
        this.messages = messages;
        this.subscriptions = [];
        this.scheduler = scheduler;
    }

    HotObservable.prototype._subscribe = function _subscribe(subscriber) {
        var subject = this;
        var index = subject.logSubscribedFrame();
        subscriber.add(new _Subscription2['default'](function () {
            subject.logUnsubscribedFrame(index);
        }));
        return _Subject.prototype._subscribe.call(this, subscriber);
    };

    HotObservable.prototype.setup = function setup() {
        var _this = this;

        var subject = this;
        var messagesLength = subject.messages.length;

        var _loop = function (i) {
            var message = subject.messages[i];
            _this.scheduler.schedule(function () {
                message.notification.observe(subject);
            }, message.frame);
        };

        for (var i = 0; i < messagesLength; i++) {
            _loop(i);
        }
    };

    return HotObservable;
})(_Subject3['default']);

exports['default'] = HotObservable;

_utilApplyMixins2['default'](HotObservable, [_SubscriptionLoggable2['default']]);
module.exports = exports['default'];