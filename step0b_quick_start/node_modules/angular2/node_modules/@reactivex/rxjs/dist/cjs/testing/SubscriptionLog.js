"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SubscriptionLog = function SubscriptionLog(subscribedFrame) {
    var unsubscribedFrame = arguments.length <= 1 || arguments[1] === undefined ? Number.POSITIVE_INFINITY : arguments[1];

    _classCallCheck(this, SubscriptionLog);

    this.subscribedFrame = subscribedFrame;
    this.unsubscribedFrame = unsubscribedFrame;
};

exports["default"] = SubscriptionLog;
module.exports = exports["default"];