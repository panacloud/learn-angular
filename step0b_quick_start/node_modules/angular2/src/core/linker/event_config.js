'use strict';var lang_1 = require('angular2/src/core/facade/lang');
exports.EVENT_TARGET_SEPARATOR = ':';
var EventConfig = (function () {
    function EventConfig(fieldName, eventName, isLongForm) {
        this.fieldName = fieldName;
        this.eventName = eventName;
        this.isLongForm = isLongForm;
    }
    EventConfig.parse = function (eventConfig) {
        var fieldName = eventConfig, eventName = eventConfig, isLongForm = false;
        var separatorIdx = eventConfig.indexOf(exports.EVENT_TARGET_SEPARATOR);
        if (separatorIdx > -1) {
            // long format: 'fieldName: eventName'
            fieldName = lang_1.StringWrapper.substring(eventConfig, 0, separatorIdx).trim();
            eventName = lang_1.StringWrapper.substring(eventConfig, separatorIdx + 1).trim();
            isLongForm = true;
        }
        return new EventConfig(fieldName, eventName, isLongForm);
    };
    EventConfig.prototype.getFullName = function () {
        return this.isLongForm ? "" + this.fieldName + exports.EVENT_TARGET_SEPARATOR + this.eventName :
            this.eventName;
    };
    return EventConfig;
})();
exports.EventConfig = EventConfig;
//# sourceMappingURL=event_config.js.map