/// <reference path="../../../../typings/hammerjs/hammerjs"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var hammer_common_1 = require('./hammer_common');
var lang_1 = require('angular2/src/facade/lang');
var HammerGesturesPlugin = (function (_super) {
    __extends(HammerGesturesPlugin, _super);
    function HammerGesturesPlugin() {
        _super.call(this);
    }
    HammerGesturesPlugin.prototype.supports = function (eventName) {
        if (!_super.prototype.supports.call(this, eventName))
            return false;
        if (!lang_1.isPresent(window['Hammer'])) {
            throw new lang_1.BaseException("Hammer.js is not loaded, can not bind " + eventName + " event");
        }
        return true;
    };
    HammerGesturesPlugin.prototype.addEventListener = function (element, eventName, handler, shouldSupportBubble) {
        if (shouldSupportBubble)
            throw new lang_1.BaseException('Hammer.js plugin does not support bubbling gestures.');
        var zone = this.manager.getZone();
        eventName = eventName.toLowerCase();
        zone.runOutsideAngular(function () {
            // Creating the manager bind events, must be done outside of angular
            var mc = new Hammer(element);
            mc.get('pinch').set({ enable: true });
            mc.get('rotate').set({ enable: true });
            mc.on(eventName, function (eventObj) { zone.run(function () { handler(eventObj); }); });
        });
    };
    return HammerGesturesPlugin;
})(hammer_common_1.HammerGesturesPluginCommon);
exports.HammerGesturesPlugin = HammerGesturesPlugin;
exports.__esModule = true;
//# sourceMappingURL=hammer_gestures.js.map