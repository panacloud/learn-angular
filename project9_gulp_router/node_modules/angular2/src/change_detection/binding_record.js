var lang_1 = require('angular2/src/facade/lang');
var DIRECTIVE = "directive";
var ELEMENT = "element";
var TEXT_NODE = "textNode";
var BindingRecord = (function () {
    function BindingRecord(mode, implicitReceiver, ast, elementIndex, propertyName, setter, directiveRecord) {
        this.mode = mode;
        this.implicitReceiver = implicitReceiver;
        this.ast = ast;
        this.elementIndex = elementIndex;
        this.propertyName = propertyName;
        this.setter = setter;
        this.directiveRecord = directiveRecord;
    }
    BindingRecord.prototype.callOnChange = function () { return lang_1.isPresent(this.directiveRecord) && this.directiveRecord.callOnChange; };
    BindingRecord.prototype.isOnPushChangeDetection = function () {
        return lang_1.isPresent(this.directiveRecord) && this.directiveRecord.isOnPushChangeDetection();
    };
    BindingRecord.prototype.isDirective = function () { return this.mode === DIRECTIVE; };
    BindingRecord.prototype.isElement = function () { return this.mode === ELEMENT; };
    BindingRecord.prototype.isTextNode = function () { return this.mode === TEXT_NODE; };
    BindingRecord.createForDirective = function (ast, propertyName, setter, directiveRecord) {
        return new BindingRecord(DIRECTIVE, 0, ast, 0, propertyName, setter, directiveRecord);
    };
    BindingRecord.createForElement = function (ast, elementIndex, propertyName) {
        return new BindingRecord(ELEMENT, 0, ast, elementIndex, propertyName, null, null);
    };
    BindingRecord.createForHostProperty = function (directiveIndex, ast, propertyName) {
        return new BindingRecord(ELEMENT, directiveIndex, ast, directiveIndex.elementIndex, propertyName, null, null);
    };
    BindingRecord.createForTextNode = function (ast, elementIndex) {
        return new BindingRecord(TEXT_NODE, 0, ast, elementIndex, null, null, null);
    };
    return BindingRecord;
})();
exports.BindingRecord = BindingRecord;
exports.__esModule = true;
//# sourceMappingURL=binding_record.js.map