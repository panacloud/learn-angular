var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var ast_1 = require('./parser/ast');
var interfaces_1 = require('./interfaces');
var change_detection_util_1 = require('./change_detection_util');
var dynamic_change_detector_1 = require('./dynamic_change_detector');
var change_detection_jit_generator_1 = require('./change_detection_jit_generator');
var directive_record_1 = require('./directive_record');
var coalesce_1 = require('./coalesce');
var proto_record_1 = require('./proto_record');
var DynamicProtoChangeDetector = (function (_super) {
    __extends(DynamicProtoChangeDetector, _super);
    function DynamicProtoChangeDetector(_pipeRegistry, definition) {
        _super.call(this);
        this._pipeRegistry = _pipeRegistry;
        this.definition = definition;
        this._records = this._createRecords(definition);
    }
    DynamicProtoChangeDetector.prototype.instantiate = function (dispatcher) {
        return new dynamic_change_detector_1.DynamicChangeDetector(this.definition.strategy, dispatcher, this._pipeRegistry, this._records, this.definition.directiveRecords);
    };
    DynamicProtoChangeDetector.prototype._createRecords = function (definition) {
        var recordBuilder = new ProtoRecordBuilder();
        collection_1.ListWrapper.forEach(definition.bindingRecords, function (b) { recordBuilder.addAst(b, definition.variableNames); });
        return coalesce_1.coalesce(recordBuilder.records);
    };
    return DynamicProtoChangeDetector;
})(interfaces_1.ProtoChangeDetector);
exports.DynamicProtoChangeDetector = DynamicProtoChangeDetector;
var _jitProtoChangeDetectorClassCounter = 0;
var JitProtoChangeDetector = (function (_super) {
    __extends(JitProtoChangeDetector, _super);
    function JitProtoChangeDetector(_pipeRegistry, definition) {
        _super.call(this);
        this._pipeRegistry = _pipeRegistry;
        this.definition = definition;
        this._factory = this._createFactory(definition);
    }
    JitProtoChangeDetector.prototype.instantiate = function (dispatcher) { return this._factory(dispatcher, this._pipeRegistry); };
    JitProtoChangeDetector.prototype._createFactory = function (definition) {
        var recordBuilder = new ProtoRecordBuilder();
        collection_1.ListWrapper.forEach(definition.bindingRecords, function (b) { recordBuilder.addAst(b, definition.variableNames); });
        var c = _jitProtoChangeDetectorClassCounter++;
        var records = coalesce_1.coalesce(recordBuilder.records);
        var typeName = "ChangeDetector" + c;
        return new change_detection_jit_generator_1.ChangeDetectorJITGenerator(typeName, definition.strategy, records, this.definition.directiveRecords)
            .generate();
    };
    return JitProtoChangeDetector;
})(interfaces_1.ProtoChangeDetector);
exports.JitProtoChangeDetector = JitProtoChangeDetector;
var ProtoRecordBuilder = (function () {
    function ProtoRecordBuilder() {
        this.records = [];
    }
    ProtoRecordBuilder.prototype.addAst = function (b, variableNames) {
        if (variableNames === void 0) { variableNames = null; }
        var oldLast = collection_1.ListWrapper.last(this.records);
        if (lang_1.isPresent(oldLast) && oldLast.bindingRecord.directiveRecord == b.directiveRecord) {
            oldLast.lastInDirective = false;
        }
        _ConvertAstIntoProtoRecords.append(this.records, b, variableNames);
        var newLast = collection_1.ListWrapper.last(this.records);
        if (lang_1.isPresent(newLast) && newLast !== oldLast) {
            newLast.lastInBinding = true;
            newLast.lastInDirective = true;
        }
    };
    return ProtoRecordBuilder;
})();
var _ConvertAstIntoProtoRecords = (function () {
    function _ConvertAstIntoProtoRecords(_records, _bindingRecord, _expressionAsString, _variableNames) {
        this._records = _records;
        this._bindingRecord = _bindingRecord;
        this._expressionAsString = _expressionAsString;
        this._variableNames = _variableNames;
    }
    _ConvertAstIntoProtoRecords.append = function (records, b, variableNames) {
        var c = new _ConvertAstIntoProtoRecords(records, b, b.ast.toString(), variableNames);
        b.ast.visit(c);
    };
    _ConvertAstIntoProtoRecords.prototype.visitImplicitReceiver = function (ast) { return this._bindingRecord.implicitReceiver; };
    _ConvertAstIntoProtoRecords.prototype.visitInterpolation = function (ast) {
        var args = this._visitAll(ast.expressions);
        return this._addRecord(proto_record_1.RECORD_TYPE_INTERPOLATE, "interpolate", _interpolationFn(ast.strings), args, ast.strings, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitLiteralPrimitive = function (ast) {
        return this._addRecord(proto_record_1.RECORD_TYPE_CONST, "literal", ast.value, [], null, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitAccessMember = function (ast) {
        var receiver = ast.receiver.visit(this);
        if (lang_1.isPresent(this._variableNames) && collection_1.ListWrapper.contains(this._variableNames, ast.name) &&
            ast.receiver instanceof
                ast_1.ImplicitReceiver) {
            return this._addRecord(proto_record_1.RECORD_TYPE_LOCAL, ast.name, ast.name, [], null, receiver);
        }
        else {
            return this._addRecord(proto_record_1.RECORD_TYPE_PROPERTY, ast.name, ast.getter, [], null, receiver);
        }
    };
    _ConvertAstIntoProtoRecords.prototype.visitMethodCall = function (ast) {
        var receiver = ast.receiver.visit(this);
        var args = this._visitAll(ast.args);
        if (lang_1.isPresent(this._variableNames) && collection_1.ListWrapper.contains(this._variableNames, ast.name)) {
            var target = this._addRecord(proto_record_1.RECORD_TYPE_LOCAL, ast.name, ast.name, [], null, receiver);
            return this._addRecord(proto_record_1.RECORD_TYPE_INVOKE_CLOSURE, "closure", null, args, null, target);
        }
        else {
            return this._addRecord(proto_record_1.RECORD_TYPE_INVOKE_METHOD, ast.name, ast.fn, args, null, receiver);
        }
    };
    _ConvertAstIntoProtoRecords.prototype.visitFunctionCall = function (ast) {
        var target = ast.target.visit(this);
        var args = this._visitAll(ast.args);
        return this._addRecord(proto_record_1.RECORD_TYPE_INVOKE_CLOSURE, "closure", null, args, null, target);
    };
    _ConvertAstIntoProtoRecords.prototype.visitLiteralArray = function (ast) {
        var primitiveName = "arrayFn" + ast.expressions.length;
        return this._addRecord(proto_record_1.RECORD_TYPE_PRIMITIVE_OP, primitiveName, _arrayFn(ast.expressions.length), this._visitAll(ast.expressions), null, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitLiteralMap = function (ast) {
        return this._addRecord(proto_record_1.RECORD_TYPE_PRIMITIVE_OP, _mapPrimitiveName(ast.keys), change_detection_util_1.ChangeDetectionUtil.mapFn(ast.keys), this._visitAll(ast.values), null, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitBinary = function (ast) {
        var left = ast.left.visit(this);
        var right = ast.right.visit(this);
        return this._addRecord(proto_record_1.RECORD_TYPE_PRIMITIVE_OP, _operationToPrimitiveName(ast.operation), _operationToFunction(ast.operation), [left, right], null, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitPrefixNot = function (ast) {
        var exp = ast.expression.visit(this);
        return this._addRecord(proto_record_1.RECORD_TYPE_PRIMITIVE_OP, "operation_negate", change_detection_util_1.ChangeDetectionUtil.operation_negate, [exp], null, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitConditional = function (ast) {
        var c = ast.condition.visit(this);
        var t = ast.trueExp.visit(this);
        var f = ast.falseExp.visit(this);
        return this._addRecord(proto_record_1.RECORD_TYPE_PRIMITIVE_OP, "cond", change_detection_util_1.ChangeDetectionUtil.cond, [c, t, f], null, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitPipe = function (ast) {
        var value = ast.exp.visit(this);
        var type = ast.inBinding ? proto_record_1.RECORD_TYPE_BINDING_PIPE : proto_record_1.RECORD_TYPE_PIPE;
        return this._addRecord(type, ast.name, ast.name, [], null, value);
    };
    _ConvertAstIntoProtoRecords.prototype.visitKeyedAccess = function (ast) {
        var obj = ast.obj.visit(this);
        var key = ast.key.visit(this);
        return this._addRecord(proto_record_1.RECORD_TYPE_KEYED_ACCESS, "keyedAccess", change_detection_util_1.ChangeDetectionUtil.keyedAccess, [key], null, obj);
    };
    _ConvertAstIntoProtoRecords.prototype._visitAll = function (asts) {
        var res = collection_1.ListWrapper.createFixedSize(asts.length);
        for (var i = 0; i < asts.length; ++i) {
            res[i] = asts[i].visit(this);
        }
        return res;
    };
    _ConvertAstIntoProtoRecords.prototype._addRecord = function (type, name, funcOrValue, args, fixedArgs, context) {
        var selfIndex = this._records.length + 1;
        if (context instanceof directive_record_1.DirectiveIndex) {
            collection_1.ListWrapper.push(this._records, new proto_record_1.ProtoRecord(type, name, funcOrValue, args, fixedArgs, -1, context, selfIndex, this._bindingRecord, this._expressionAsString, false, false));
        }
        else {
            collection_1.ListWrapper.push(this._records, new proto_record_1.ProtoRecord(type, name, funcOrValue, args, fixedArgs, context, null, selfIndex, this._bindingRecord, this._expressionAsString, false, false));
        }
        return selfIndex;
    };
    return _ConvertAstIntoProtoRecords;
})();
function _arrayFn(length) {
    switch (length) {
        case 0:
            return change_detection_util_1.ChangeDetectionUtil.arrayFn0;
        case 1:
            return change_detection_util_1.ChangeDetectionUtil.arrayFn1;
        case 2:
            return change_detection_util_1.ChangeDetectionUtil.arrayFn2;
        case 3:
            return change_detection_util_1.ChangeDetectionUtil.arrayFn3;
        case 4:
            return change_detection_util_1.ChangeDetectionUtil.arrayFn4;
        case 5:
            return change_detection_util_1.ChangeDetectionUtil.arrayFn5;
        case 6:
            return change_detection_util_1.ChangeDetectionUtil.arrayFn6;
        case 7:
            return change_detection_util_1.ChangeDetectionUtil.arrayFn7;
        case 8:
            return change_detection_util_1.ChangeDetectionUtil.arrayFn8;
        case 9:
            return change_detection_util_1.ChangeDetectionUtil.arrayFn9;
        default:
            throw new lang_1.BaseException("Does not support literal maps with more than 9 elements");
    }
}
function _mapPrimitiveName(keys) {
    var stringifiedKeys = collection_1.ListWrapper.join(collection_1.ListWrapper.map(keys, function (k) { return lang_1.isString(k) ? "\"" + k + "\"" : "" + k; }), ", ");
    return "mapFn([" + stringifiedKeys + "])";
}
function _operationToPrimitiveName(operation) {
    switch (operation) {
        case '+':
            return "operation_add";
        case '-':
            return "operation_subtract";
        case '*':
            return "operation_multiply";
        case '/':
            return "operation_divide";
        case '%':
            return "operation_remainder";
        case '==':
            return "operation_equals";
        case '!=':
            return "operation_not_equals";
        case '===':
            return "operation_identical";
        case '!==':
            return "operation_not_identical";
        case '<':
            return "operation_less_then";
        case '>':
            return "operation_greater_then";
        case '<=':
            return "operation_less_or_equals_then";
        case '>=':
            return "operation_greater_or_equals_then";
        case '&&':
            return "operation_logical_and";
        case '||':
            return "operation_logical_or";
        default:
            throw new lang_1.BaseException("Unsupported operation " + operation);
    }
}
function _operationToFunction(operation) {
    switch (operation) {
        case '+':
            return change_detection_util_1.ChangeDetectionUtil.operation_add;
        case '-':
            return change_detection_util_1.ChangeDetectionUtil.operation_subtract;
        case '*':
            return change_detection_util_1.ChangeDetectionUtil.operation_multiply;
        case '/':
            return change_detection_util_1.ChangeDetectionUtil.operation_divide;
        case '%':
            return change_detection_util_1.ChangeDetectionUtil.operation_remainder;
        case '==':
            return change_detection_util_1.ChangeDetectionUtil.operation_equals;
        case '!=':
            return change_detection_util_1.ChangeDetectionUtil.operation_not_equals;
        case '===':
            return change_detection_util_1.ChangeDetectionUtil.operation_identical;
        case '!==':
            return change_detection_util_1.ChangeDetectionUtil.operation_not_identical;
        case '<':
            return change_detection_util_1.ChangeDetectionUtil.operation_less_then;
        case '>':
            return change_detection_util_1.ChangeDetectionUtil.operation_greater_then;
        case '<=':
            return change_detection_util_1.ChangeDetectionUtil.operation_less_or_equals_then;
        case '>=':
            return change_detection_util_1.ChangeDetectionUtil.operation_greater_or_equals_then;
        case '&&':
            return change_detection_util_1.ChangeDetectionUtil.operation_logical_and;
        case '||':
            return change_detection_util_1.ChangeDetectionUtil.operation_logical_or;
        default:
            throw new lang_1.BaseException("Unsupported operation " + operation);
    }
}
function s(v) {
    return lang_1.isPresent(v) ? "" + v : '';
}
function _interpolationFn(strings) {
    var length = strings.length;
    var c0 = length > 0 ? strings[0] : null;
    var c1 = length > 1 ? strings[1] : null;
    var c2 = length > 2 ? strings[2] : null;
    var c3 = length > 3 ? strings[3] : null;
    var c4 = length > 4 ? strings[4] : null;
    var c5 = length > 5 ? strings[5] : null;
    var c6 = length > 6 ? strings[6] : null;
    var c7 = length > 7 ? strings[7] : null;
    var c8 = length > 8 ? strings[8] : null;
    var c9 = length > 9 ? strings[9] : null;
    switch (length - 1) {
        case 1:
            return function (a1) { return c0 + s(a1) + c1; };
        case 2:
            return function (a1, a2) { return c0 + s(a1) + c1 + s(a2) + c2; };
        case 3:
            return function (a1, a2, a3) { return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3; };
        case 4:
            return function (a1, a2, a3, a4) { return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4; };
        case 5:
            return function (a1, a2, a3, a4, a5) {
                return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5;
            };
        case 6:
            return function (a1, a2, a3, a4, a5, a6) {
                return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6;
            };
        case 7:
            return function (a1, a2, a3, a4, a5, a6, a7) { return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) +
                c4 + s(a5) + c5 + s(a6) + c6 + s(a7) + c7; };
        case 8:
            return function (a1, a2, a3, a4, a5, a6, a7, a8) { return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) +
                c4 + s(a5) + c5 + s(a6) + c6 + s(a7) + c7 + s(a8) +
                c8; };
        case 9:
            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9) { return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 +
                s(a4) + c4 + s(a5) + c5 + s(a6) + c6 + s(a7) +
                c7 + s(a8) + c8 + s(a9) + c9; };
        default:
            throw new lang_1.BaseException("Does not support more than 9 expressions");
    }
}
exports.__esModule = true;
//# sourceMappingURL=proto_change_detector.js.map