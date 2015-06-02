var lang_1 = require('angular2/src/facade/lang');
var abstract_change_detector_1 = require('./abstract_change_detector');
var change_detection_util_1 = require('./change_detection_util');
var proto_record_1 = require('./proto_record');
/**
 * The code generator takes a list of proto records and creates a function/class
 * that "emulates" what the developer would write by hand to implement the same
 * kind of behaviour.
 *
 * The implementation comprises two parts:
 * * ChangeDetectorJITGenerator has the logic of how everything fits together.
 * * template functions (e.g., constructorTemplate) define what code is generated.
*/
var ABSTRACT_CHANGE_DETECTOR = "AbstractChangeDetector";
var UTIL = "ChangeDetectionUtil";
var DISPATCHER_ACCESSOR = "this.dispatcher";
var PIPE_REGISTRY_ACCESSOR = "this.pipeRegistry";
var PROTOS_ACCESSOR = "this.protos";
var DIRECTIVES_ACCESSOR = "this.directiveRecords";
var CONTEXT_ACCESSOR = "this.context";
var IS_CHANGED_LOCAL = "isChanged";
var CHANGES_LOCAL = "changes";
var LOCALS_ACCESSOR = "this.locals";
var MODE_ACCESSOR = "this.mode";
var TEMP_LOCAL = "temp";
var CURRENT_PROTO = "currentProto";
function typeTemplate(type, cons, detectChanges, notifyOnAllChangesDone, setContext) {
    return "\n" + cons + "\n" + detectChanges + "\n" + notifyOnAllChangesDone + "\n" + setContext + ";\n\nreturn function(dispatcher, pipeRegistry) {\n  return new " + type + "(dispatcher, pipeRegistry, protos, directiveRecords);\n}\n";
}
function constructorTemplate(type, fieldsDefinitions) {
    return "\nvar " + type + " = function " + type + "(dispatcher, pipeRegistry, protos, directiveRecords) {\n" + ABSTRACT_CHANGE_DETECTOR + ".call(this);\n" + DISPATCHER_ACCESSOR + " = dispatcher;\n" + PIPE_REGISTRY_ACCESSOR + " = pipeRegistry;\n" + PROTOS_ACCESSOR + " = protos;\n" + DIRECTIVES_ACCESSOR + " = directiveRecords;\n" + LOCALS_ACCESSOR + " = null;\n" + fieldsDefinitions + "\n}\n\n" + type + ".prototype = Object.create(" + ABSTRACT_CHANGE_DETECTOR + ".prototype);\n";
}
function pipeOnDestroyTemplate(pipeNames) {
    return pipeNames.map(function (p) { return (p + ".onDestroy()"); }).join("\n");
}
function hydrateTemplate(type, mode, fieldDefinitions, pipeOnDestroy, directiveFieldNames, detectorFieldNames) {
    var directiveInit = "";
    for (var i = 0; i < directiveFieldNames.length; ++i) {
        directiveInit +=
            directiveFieldNames[i] + " = directives.getDirectiveFor(this.directiveRecords[" + i + "].directiveIndex);\n";
    }
    var detectorInit = "";
    for (var i = 0; i < detectorFieldNames.length; ++i) {
        detectorInit +=
            detectorFieldNames[i] + " = directives.getDetectorFor(this.directiveRecords[" + i + "].directiveIndex);\n";
    }
    return "\n" + type + ".prototype.hydrate = function(context, locals, directives) {\n  " + MODE_ACCESSOR + " = \"" + mode + "\";\n  " + CONTEXT_ACCESSOR + " = context;\n  " + LOCALS_ACCESSOR + " = locals;\n  " + directiveInit + "\n  " + detectorInit + "\n}\n" + type + ".prototype.dehydrate = function() {\n  " + pipeOnDestroy + "\n  " + fieldDefinitions + "\n  " + LOCALS_ACCESSOR + " = null;\n}\n" + type + ".prototype.hydrated = function() {\n  return " + CONTEXT_ACCESSOR + " !== " + UTIL + ".uninitialized();\n}\n";
}
function detectChangesTemplate(type, body) {
    return "\n" + type + ".prototype.detectChangesInRecords = function(throwOnChange) {\n  " + body + "\n}\n";
}
function callOnAllChangesDoneTemplate(type, body) {
    return "\n" + type + ".prototype.callOnAllChangesDone = function() {\n  " + body + "\n}\n";
}
function onAllChangesDoneTemplate(directive) {
    return directive + ".onAllChangesDone();";
}
function detectChangesBodyTemplate(localDefinitions, changeDefinitions, records) {
    return "\n" + localDefinitions + "\n" + changeDefinitions + "\nvar " + TEMP_LOCAL + ";\nvar " + IS_CHANGED_LOCAL + " = false;\nvar " + CURRENT_PROTO + ";\nvar " + CHANGES_LOCAL + " = null;\n\ncontext = " + CONTEXT_ACCESSOR + ";\n" + records + "\n";
}
function pipeCheckTemplate(protoIndex, context, bindingPropagationConfig, pipe, pipeType, oldValue, newValue, change, update, addToChanges, lastInDirective) {
    return "\n" + CURRENT_PROTO + " = " + PROTOS_ACCESSOR + "[" + protoIndex + "];\nif (" + pipe + " === " + UTIL + ".uninitialized()) {\n  " + pipe + " = " + PIPE_REGISTRY_ACCESSOR + ".get('" + pipeType + "', " + context + ", " + bindingPropagationConfig + ");\n} else if (!" + pipe + ".supports(" + context + ")) {\n  " + pipe + ".onDestroy();\n  " + pipe + " = " + PIPE_REGISTRY_ACCESSOR + ".get('" + pipeType + "', " + context + ", " + bindingPropagationConfig + ");\n}\n\n" + newValue + " = " + pipe + ".transform(" + context + ");\nif (" + oldValue + " !== " + newValue + ") {\n  " + newValue + " = " + UTIL + ".unwrapValue(" + newValue + ");\n  " + change + " = true;\n  " + update + "\n  " + addToChanges + "\n  " + oldValue + " = " + newValue + ";\n}\n" + lastInDirective + "\n";
}
function referenceCheckTemplate(protoIndex, assignment, oldValue, newValue, change, update, addToChanges, lastInDirective) {
    return "\n" + CURRENT_PROTO + " = " + PROTOS_ACCESSOR + "[" + protoIndex + "];\n" + assignment + "\nif (" + newValue + " !== " + oldValue + " || (" + newValue + " !== " + newValue + ") && (" + oldValue + " !== " + oldValue + ")) {\n  " + change + " = true;\n  " + update + "\n  " + addToChanges + "\n  " + oldValue + " = " + newValue + ";\n}\n" + lastInDirective + "\n";
}
function assignmentTemplate(field, value) {
    return field + " = " + value + ";";
}
function localDefinitionsTemplate(names) {
    return names.map(function (n) { return ("var " + n + ";"); }).join("\n");
}
function changeDefinitionsTemplate(names) {
    return names.map(function (n) { return ("var " + n + " = false;"); }).join("\n");
}
function fieldDefinitionsTemplate(names) {
    return names.map(function (n) { return (n + " = " + UTIL + ".uninitialized();"); }).join("\n");
}
function ifChangedGuardTemplate(changeNames, body) {
    var cond = changeNames.join(" || ");
    return "\nif (" + cond + ") {\n  " + body + "\n}\n";
}
function addToChangesTemplate(oldValue, newValue) {
    return CHANGES_LOCAL + " = " + UTIL + ".addChange(" + CHANGES_LOCAL + ", " + CURRENT_PROTO + ".bindingRecord.propertyName, " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));";
}
function updateDirectiveTemplate(oldValue, newValue, directiveProperty) {
    return "\nif(throwOnChange) " + UTIL + ".throwOnChange(" + CURRENT_PROTO + ", " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));\n" + directiveProperty + " = " + newValue + ";\n" + IS_CHANGED_LOCAL + " = true;\n  ";
}
function updateElementTemplate(oldValue, newValue) {
    return "\nif(throwOnChange) " + UTIL + ".throwOnChange(" + CURRENT_PROTO + ", " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));\n" + DISPATCHER_ACCESSOR + ".notifyOnBinding(" + CURRENT_PROTO + ".bindingRecord, " + newValue + ");\n  ";
}
function notifyOnChangesTemplate(directive) {
    return "\nif(" + CHANGES_LOCAL + ") {\n  " + directive + ".onChange(" + CHANGES_LOCAL + ");\n  " + CHANGES_LOCAL + " = null;\n}\n";
}
function notifyOnPushDetectorsTemplate(detector) {
    return "\nif(" + IS_CHANGED_LOCAL + ") {\n  " + detector + ".markAsCheckOnce();\n}\n";
}
function lastInDirectiveTemplate(notifyOnChanges, notifyOnPush) {
    return "\n" + notifyOnChanges + "\n" + notifyOnPush + "\n" + IS_CHANGED_LOCAL + " = false;\n";
}
var ChangeDetectorJITGenerator = (function () {
    function ChangeDetectorJITGenerator(typeName, changeDetectionStrategy, records, directiveRecords) {
        this.typeName = typeName;
        this.changeDetectionStrategy = changeDetectionStrategy;
        this.records = records;
        this.directiveRecords = directiveRecords;
        this.localNames = this.getLocalNames(records);
        this.changeNames = this.getChangeNames(this.localNames);
        this.fieldNames = this.getFieldNames(this.localNames);
        this.pipeNames = this.getPipeNames(this.localNames);
    }
    ChangeDetectorJITGenerator.prototype.getLocalNames = function (records) {
        var index = 0;
        var names = records.map(function (r) {
            var sanitizedName = r.name.replace(new RegExp("\\W", "g"), '');
            return "" + sanitizedName + index++;
        });
        return ["context"].concat(names);
    };
    ChangeDetectorJITGenerator.prototype.getChangeNames = function (localNames) {
        return localNames.map(function (n) { return ("change_" + n); });
    };
    ChangeDetectorJITGenerator.prototype.getFieldNames = function (localNames) {
        return localNames.map(function (n) { return ("this." + n); });
    };
    ChangeDetectorJITGenerator.prototype.getPipeNames = function (localNames) {
        return localNames.map(function (n) { return ("this." + n + "_pipe"); });
    };
    ChangeDetectorJITGenerator.prototype.generate = function () {
        var text = typeTemplate(this.typeName, this.genConstructor(), this.genDetectChanges(), this.genCallOnAllChangesDone(), this.genHydrate());
        return new Function('AbstractChangeDetector', 'ChangeDetectionUtil', 'protos', 'directiveRecords', text)(abstract_change_detector_1.AbstractChangeDetector, change_detection_util_1.ChangeDetectionUtil, this.records, this.directiveRecords);
    };
    ChangeDetectorJITGenerator.prototype.genConstructor = function () {
        return constructorTemplate(this.typeName, this.genFieldDefinitions());
    };
    ChangeDetectorJITGenerator.prototype.genHydrate = function () {
        var mode = change_detection_util_1.ChangeDetectionUtil.changeDetectionMode(this.changeDetectionStrategy);
        return hydrateTemplate(this.typeName, mode, this.genFieldDefinitions(), pipeOnDestroyTemplate(this.getNonNullPipeNames()), this.getDirectiveFieldNames(), this.getDetectorFieldNames());
    };
    ChangeDetectorJITGenerator.prototype.getDirectiveFieldNames = function () {
        var _this = this;
        return this.directiveRecords.map(function (d) { return _this.getDirective(d.directiveIndex); });
    };
    ChangeDetectorJITGenerator.prototype.getDetectorFieldNames = function () {
        var _this = this;
        return this.directiveRecords.filter(function (r) { return r.isOnPushChangeDetection(); })
            .map(function (d) { return _this.getDetector(d.directiveIndex); });
    };
    ChangeDetectorJITGenerator.prototype.getDirective = function (d) { return "this.directive_" + d.name; };
    ChangeDetectorJITGenerator.prototype.getDetector = function (d) { return "this.detector_" + d.name; };
    ChangeDetectorJITGenerator.prototype.genFieldDefinitions = function () {
        var fields = [];
        fields = fields.concat(this.fieldNames);
        fields = fields.concat(this.getNonNullPipeNames());
        fields = fields.concat(this.getDirectiveFieldNames());
        fields = fields.concat(this.getDetectorFieldNames());
        return fieldDefinitionsTemplate(fields);
    };
    ChangeDetectorJITGenerator.prototype.getNonNullPipeNames = function () {
        var _this = this;
        var pipes = [];
        this.records.forEach(function (r) {
            if (r.mode === proto_record_1.RECORD_TYPE_PIPE || r.mode === proto_record_1.RECORD_TYPE_BINDING_PIPE) {
                pipes.push(_this.pipeNames[r.selfIndex]);
            }
        });
        return pipes;
    };
    ChangeDetectorJITGenerator.prototype.genDetectChanges = function () {
        var body = this.genDetectChangesBody();
        return detectChangesTemplate(this.typeName, body);
    };
    ChangeDetectorJITGenerator.prototype.genCallOnAllChangesDone = function () {
        var notifications = [];
        var dirs = this.directiveRecords;
        for (var i = dirs.length - 1; i >= 0; --i) {
            var dir = dirs[i];
            if (dir.callOnAllChangesDone) {
                var directive = "this.directive_" + dir.directiveIndex.name;
                notifications.push(onAllChangesDoneTemplate(directive));
            }
        }
        return callOnAllChangesDoneTemplate(this.typeName, notifications.join(";\n"));
    };
    ChangeDetectorJITGenerator.prototype.genDetectChangesBody = function () {
        var _this = this;
        var rec = this.records.map(function (r) { return _this.genRecord(r); }).join("\n");
        return detectChangesBodyTemplate(this.genLocalDefinitions(), this.genChangeDefinitions(), rec);
    };
    ChangeDetectorJITGenerator.prototype.genLocalDefinitions = function () { return localDefinitionsTemplate(this.localNames); };
    ChangeDetectorJITGenerator.prototype.genChangeDefinitions = function () { return changeDefinitionsTemplate(this.changeNames); };
    ChangeDetectorJITGenerator.prototype.genRecord = function (r) {
        if (r.mode === proto_record_1.RECORD_TYPE_PIPE || r.mode === proto_record_1.RECORD_TYPE_BINDING_PIPE) {
            return this.genPipeCheck(r);
        }
        else {
            return this.genReferenceCheck(r);
        }
    };
    ChangeDetectorJITGenerator.prototype.genPipeCheck = function (r) {
        var context = this.localNames[r.contextIndex];
        var oldValue = this.fieldNames[r.selfIndex];
        var newValue = this.localNames[r.selfIndex];
        var change = this.changeNames[r.selfIndex];
        var pipe = this.pipeNames[r.selfIndex];
        var cdRef = r.mode === proto_record_1.RECORD_TYPE_BINDING_PIPE ? "this.ref" : "null";
        var update = this.genUpdateDirectiveOrElement(r);
        var addToChanges = this.genAddToChanges(r);
        var lastInDirective = this.genLastInDirective(r);
        return pipeCheckTemplate(r.selfIndex - 1, context, cdRef, pipe, r.name, oldValue, newValue, change, update, addToChanges, lastInDirective);
    };
    ChangeDetectorJITGenerator.prototype.genReferenceCheck = function (r) {
        var oldValue = this.fieldNames[r.selfIndex];
        var newValue = this.localNames[r.selfIndex];
        var change = this.changeNames[r.selfIndex];
        var assignment = this.genUpdateCurrentValue(r);
        var update = this.genUpdateDirectiveOrElement(r);
        var addToChanges = this.genAddToChanges(r);
        var lastInDirective = this.genLastInDirective(r);
        var check = referenceCheckTemplate(r.selfIndex - 1, assignment, oldValue, newValue, change, update, addToChanges, lastInDirective);
        if (r.isPureFunction()) {
            return this.ifChangedGuard(r, check);
        }
        else {
            return check;
        }
    };
    ChangeDetectorJITGenerator.prototype.genUpdateCurrentValue = function (r) {
        var context = this.getContext(r);
        var newValue = this.localNames[r.selfIndex];
        var args = this.genArgs(r);
        switch (r.mode) {
            case proto_record_1.RECORD_TYPE_SELF:
                return assignmentTemplate(newValue, context);
            case proto_record_1.RECORD_TYPE_CONST:
                return newValue + " = " + this.genLiteral(r.funcOrValue);
            case proto_record_1.RECORD_TYPE_PROPERTY:
                return assignmentTemplate(newValue, context + "." + r.name);
            case proto_record_1.RECORD_TYPE_LOCAL:
                return assignmentTemplate(newValue, LOCALS_ACCESSOR + ".get('" + r.name + "')");
            case proto_record_1.RECORD_TYPE_INVOKE_METHOD:
                return assignmentTemplate(newValue, context + "." + r.name + "(" + args + ")");
            case proto_record_1.RECORD_TYPE_INVOKE_CLOSURE:
                return assignmentTemplate(newValue, context + "(" + args + ")");
            case proto_record_1.RECORD_TYPE_PRIMITIVE_OP:
                return assignmentTemplate(newValue, UTIL + "." + r.name + "(" + args + ")");
            case proto_record_1.RECORD_TYPE_INTERPOLATE:
                return assignmentTemplate(newValue, this.genInterpolation(r));
            case proto_record_1.RECORD_TYPE_KEYED_ACCESS:
                var key = this.localNames[r.args[0]];
                return assignmentTemplate(newValue, context + "[" + key + "]");
            default:
                throw new lang_1.BaseException("Unknown operation " + r.mode);
        }
    };
    ChangeDetectorJITGenerator.prototype.getContext = function (r) {
        if (r.contextIndex == -1) {
            return this.getDirective(r.directiveIndex);
        }
        else {
            return this.localNames[r.contextIndex];
        }
    };
    ChangeDetectorJITGenerator.prototype.ifChangedGuard = function (r, body) {
        var _this = this;
        return ifChangedGuardTemplate(r.args.map(function (a) { return _this.changeNames[a]; }), body);
    };
    ChangeDetectorJITGenerator.prototype.genInterpolation = function (r) {
        var res = "";
        for (var i = 0; i < r.args.length; ++i) {
            res += this.genLiteral(r.fixedArgs[i]);
            res += " + ";
            res += this.localNames[r.args[i]];
            res += " + ";
        }
        res += this.genLiteral(r.fixedArgs[r.args.length]);
        return res;
    };
    ChangeDetectorJITGenerator.prototype.genLiteral = function (value) { return JSON.stringify(value); };
    ChangeDetectorJITGenerator.prototype.genUpdateDirectiveOrElement = function (r) {
        if (!r.lastInBinding)
            return "";
        var newValue = this.localNames[r.selfIndex];
        var oldValue = this.fieldNames[r.selfIndex];
        var br = r.bindingRecord;
        if (br.isDirective()) {
            var directiveProperty = this.getDirective(br.directiveRecord.directiveIndex) + "." + br.propertyName;
            return updateDirectiveTemplate(oldValue, newValue, directiveProperty);
        }
        else {
            return updateElementTemplate(oldValue, newValue);
        }
    };
    ChangeDetectorJITGenerator.prototype.genAddToChanges = function (r) {
        var newValue = this.localNames[r.selfIndex];
        var oldValue = this.fieldNames[r.selfIndex];
        return r.bindingRecord.callOnChange() ? addToChangesTemplate(oldValue, newValue) : "";
    };
    ChangeDetectorJITGenerator.prototype.genLastInDirective = function (r) {
        var onChanges = this.genNotifyOnChanges(r);
        var onPush = this.genNotifyOnPushDetectors(r);
        return lastInDirectiveTemplate(onChanges, onPush);
    };
    ChangeDetectorJITGenerator.prototype.genNotifyOnChanges = function (r) {
        var br = r.bindingRecord;
        if (r.lastInDirective && br.callOnChange()) {
            return notifyOnChangesTemplate(this.getDirective(br.directiveRecord.directiveIndex));
        }
        else {
            return "";
        }
    };
    ChangeDetectorJITGenerator.prototype.genNotifyOnPushDetectors = function (r) {
        var br = r.bindingRecord;
        if (r.lastInDirective && br.isOnPushChangeDetection()) {
            return notifyOnPushDetectorsTemplate(this.getDetector(br.directiveRecord.directiveIndex));
        }
        else {
            return "";
        }
    };
    ChangeDetectorJITGenerator.prototype.genArgs = function (r) {
        var _this = this;
        return r.args.map(function (arg) { return _this.localNames[arg]; }).join(", ");
    };
    return ChangeDetectorJITGenerator;
})();
exports.ChangeDetectorJITGenerator = ChangeDetectorJITGenerator;
exports.__esModule = true;
//# sourceMappingURL=change_detection_jit_generator.js.map