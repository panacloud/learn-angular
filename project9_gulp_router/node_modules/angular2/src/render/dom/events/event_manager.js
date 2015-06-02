var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var lang_1 = require('angular2/src/facade/lang');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var BUBBLE_SYMBOL = '^';
var EventManager = (function () {
    function EventManager(plugins, zone) {
        this._zone = zone;
        this._plugins = plugins;
        for (var i = 0; i < plugins.length; i++) {
            plugins[i].manager = this;
        }
    }
    EventManager.prototype.addEventListener = function (element, eventName, handler) {
        var withoutBubbleSymbol = this._removeBubbleSymbol(eventName);
        var plugin = this._findPluginFor(withoutBubbleSymbol);
        plugin.addEventListener(element, withoutBubbleSymbol, handler, withoutBubbleSymbol != eventName);
    };
    EventManager.prototype.addGlobalEventListener = function (target, eventName, handler) {
        var withoutBubbleSymbol = this._removeBubbleSymbol(eventName);
        var plugin = this._findPluginFor(withoutBubbleSymbol);
        return plugin.addGlobalEventListener(target, withoutBubbleSymbol, handler, withoutBubbleSymbol != eventName);
    };
    EventManager.prototype.getZone = function () { return this._zone; };
    EventManager.prototype._findPluginFor = function (eventName) {
        var plugins = this._plugins;
        for (var i = 0; i < plugins.length; i++) {
            var plugin = plugins[i];
            if (plugin.supports(eventName)) {
                return plugin;
            }
        }
        throw new lang_1.BaseException("No event manager plugin found for event " + eventName);
    };
    EventManager.prototype._removeBubbleSymbol = function (eventName) {
        return eventName[0] == BUBBLE_SYMBOL ? lang_1.StringWrapper.substring(eventName, 1) : eventName;
    };
    return EventManager;
})();
exports.EventManager = EventManager;
var EventManagerPlugin = (function () {
    function EventManagerPlugin() {
    }
    // We are assuming here that all plugins support bubbled and non-bubbled events.
    // That is equivalent to having supporting $event.target
    // The bubbling flag (currently ^) is stripped before calling the supports and
    // addEventListener methods.
    EventManagerPlugin.prototype.supports = function (eventName) { return false; };
    EventManagerPlugin.prototype.addEventListener = function (element, eventName, handler, shouldSupportBubble) {
        throw "not implemented";
    };
    EventManagerPlugin.prototype.addGlobalEventListener = function (element, eventName, handler, shouldSupportBubble) {
        throw "not implemented";
    };
    return EventManagerPlugin;
})();
exports.EventManagerPlugin = EventManagerPlugin;
var DomEventsPlugin = (function (_super) {
    __extends(DomEventsPlugin, _super);
    function DomEventsPlugin() {
        _super.apply(this, arguments);
    }
    // This plugin should come last in the list of plugins, because it accepts all
    // events.
    DomEventsPlugin.prototype.supports = function (eventName) { return true; };
    DomEventsPlugin.prototype.addEventListener = function (element, eventName, handler, shouldSupportBubble) {
        var outsideHandler = this._getOutsideHandler(shouldSupportBubble, element, handler, this.manager._zone);
        this.manager._zone.runOutsideAngular(function () { dom_adapter_1.DOM.on(element, eventName, outsideHandler); });
    };
    DomEventsPlugin.prototype.addGlobalEventListener = function (target, eventName, handler, shouldSupportBubble) {
        var element = dom_adapter_1.DOM.getGlobalEventTarget(target);
        var outsideHandler = this._getOutsideHandler(shouldSupportBubble, element, handler, this.manager._zone);
        return this.manager._zone.runOutsideAngular(function () { return dom_adapter_1.DOM.onAndCancel(element, eventName, outsideHandler); });
    };
    DomEventsPlugin.prototype._getOutsideHandler = function (shouldSupportBubble, element, handler, zone) {
        return shouldSupportBubble ? DomEventsPlugin.bubbleCallback(element, handler, zone) :
            DomEventsPlugin.sameElementCallback(element, handler, zone);
    };
    DomEventsPlugin.sameElementCallback = function (element, handler, zone) {
        return function (event) { if (event.target === element) {
            zone.run(function () { return handler(event); });
        } };
    };
    DomEventsPlugin.bubbleCallback = function (element, handler, zone) {
        return function (event) { return zone.run(function () { return handler(event); }); };
    };
    return DomEventsPlugin;
})(EventManagerPlugin);
exports.DomEventsPlugin = DomEventsPlugin;
exports.__esModule = true;
//# sourceMappingURL=event_manager.js.map