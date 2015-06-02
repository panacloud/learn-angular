var constants_1 = require('./constants');
var lang_1 = require('angular2/src/facade/lang');
var DirectiveIndex = (function () {
    function DirectiveIndex(elementIndex, directiveIndex) {
        this.elementIndex = elementIndex;
        this.directiveIndex = directiveIndex;
    }
    Object.defineProperty(DirectiveIndex.prototype, "name", {
        get: function () { return this.elementIndex + "_" + this.directiveIndex; },
        enumerable: true,
        configurable: true
    });
    return DirectiveIndex;
})();
exports.DirectiveIndex = DirectiveIndex;
var DirectiveRecord = (function () {
    function DirectiveRecord(directiveIndex, callOnAllChangesDone, callOnChange, changeDetection) {
        this.directiveIndex = directiveIndex;
        this.callOnAllChangesDone = callOnAllChangesDone;
        this.callOnChange = callOnChange;
        this.changeDetection = changeDetection;
    }
    DirectiveRecord.prototype.isOnPushChangeDetection = function () { return lang_1.StringWrapper.equals(this.changeDetection, constants_1.ON_PUSH); };
    return DirectiveRecord;
})();
exports.DirectiveRecord = DirectiveRecord;
exports.__esModule = true;
//# sourceMappingURL=directive_record.js.map