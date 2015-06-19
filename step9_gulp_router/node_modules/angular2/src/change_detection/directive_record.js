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
    function DirectiveRecord(_a) {
        var _b = _a === void 0 ? {} : _a, directiveIndex = _b.directiveIndex, callOnAllChangesDone = _b.callOnAllChangesDone, callOnChange = _b.callOnChange, callOnCheck = _b.callOnCheck, callOnInit = _b.callOnInit, changeDetection = _b.changeDetection;
        this.directiveIndex = directiveIndex;
        this.callOnAllChangesDone = lang_1.normalizeBool(callOnAllChangesDone);
        this.callOnChange = lang_1.normalizeBool(callOnChange);
        this.callOnCheck = lang_1.normalizeBool(callOnCheck);
        this.callOnInit = lang_1.normalizeBool(callOnInit);
        this.changeDetection = changeDetection;
    }
    DirectiveRecord.prototype.isOnPushChangeDetection = function () { return lang_1.StringWrapper.equals(this.changeDetection, constants_1.ON_PUSH); };
    return DirectiveRecord;
})();
exports.DirectiveRecord = DirectiveRecord;
exports.__esModule = true;
//# sourceMappingURL=directive_record.js.map