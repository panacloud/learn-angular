var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var collection_1 = require('angular2/src/facade/collection');
var validators_1 = require('./validators');
/**
 * Indicates that a Control is valid, i.e. that no errors exist in the input value.
 *
 * @exportedAs angular2/forms
 */
exports.VALID = "VALID";
/**
 * Indicates that a Control is invalid, i.e. that an error exists in the input value.
 *
 * @exportedAs angular2/forms
 */
exports.INVALID = "INVALID";
function isControl(c) {
    return c instanceof AbstractControl;
}
exports.isControl = isControl;
/**
 * Omitting from external API doc as this is really an abstract internal concept.
 */
var AbstractControl = (function () {
    function AbstractControl(validator) {
        this.validator = validator;
        this._pristine = true;
    }
    Object.defineProperty(AbstractControl.prototype, "value", {
        get: function () { return this._value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "status", {
        get: function () { return this._status; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valid", {
        get: function () { return this._status === exports.VALID; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "errors", {
        get: function () { return this._errors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "pristine", {
        get: function () { return this._pristine; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "dirty", {
        get: function () { return !this.pristine; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valueChanges", {
        get: function () { return this._valueChanges; },
        enumerable: true,
        configurable: true
    });
    AbstractControl.prototype.setParent = function (parent) { this._parent = parent; };
    AbstractControl.prototype._updateParent = function () {
        if (lang_1.isPresent(this._parent)) {
            this._parent._updateValue();
        }
    };
    return AbstractControl;
})();
exports.AbstractControl = AbstractControl;
/**
 * Defines a part of a form that cannot be divided into other controls.
 *
 * `Control` is one of the three fundamental building blocks used to define forms in Angular, along
 * with
 * {@link ControlGroup} and {@link ControlArray}.
 *
 * @exportedAs angular2/forms
 */
var Control = (function (_super) {
    __extends(Control, _super);
    function Control(value, validator) {
        if (validator === void 0) { validator = validators_1.Validators.nullValidator; }
        _super.call(this, validator);
        this._setValueErrorsStatus(value);
        this._valueChanges = new async_1.EventEmitter();
    }
    Control.prototype.updateValue = function (value) {
        this._setValueErrorsStatus(value);
        this._pristine = false;
        async_1.ObservableWrapper.callNext(this._valueChanges, this._value);
        this._updateParent();
    };
    Control.prototype._setValueErrorsStatus = function (value) {
        this._value = value;
        this._errors = this.validator(this);
        this._status = lang_1.isPresent(this._errors) ? exports.INVALID : exports.VALID;
    };
    return Control;
})(AbstractControl);
exports.Control = Control;
/**
 * Defines a part of a form, of fixed length, that can contain other controls.
 *
 * A ControlGroup aggregates the values and errors of each {@link Control} in the group. Thus, if
 * one of the controls
 * in a group is invalid, the entire group is invalid. Similarly, if a control changes its value,
 * the entire group
 * changes as well.
 *
 * `ControlGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with
 * {@link Control} and {@link ControlArray}. {@link ControlArray} can also contain other controls,
 * but is of variable
 * length.
 *
 * @exportedAs angular2/forms
 */
var ControlGroup = (function (_super) {
    __extends(ControlGroup, _super);
    function ControlGroup(controls, optionals, validator) {
        if (optionals === void 0) { optionals = null; }
        if (validator === void 0) { validator = validators_1.Validators.group; }
        _super.call(this, validator);
        this.controls = controls;
        this._optionals = lang_1.isPresent(optionals) ? optionals : {};
        this._valueChanges = new async_1.EventEmitter();
        this._setParentForControls();
        this._setValueErrorsStatus();
    }
    ControlGroup.prototype.include = function (controlName) {
        collection_1.StringMapWrapper.set(this._optionals, controlName, true);
        this._updateValue();
    };
    ControlGroup.prototype.exclude = function (controlName) {
        collection_1.StringMapWrapper.set(this._optionals, controlName, false);
        this._updateValue();
    };
    ControlGroup.prototype.contains = function (controlName) {
        var c = collection_1.StringMapWrapper.contains(this.controls, controlName);
        return c && this._included(controlName);
    };
    ControlGroup.prototype._setParentForControls = function () {
        var _this = this;
        collection_1.StringMapWrapper.forEach(this.controls, function (control, name) { control.setParent(_this); });
    };
    ControlGroup.prototype._updateValue = function () {
        this._setValueErrorsStatus();
        this._pristine = false;
        async_1.ObservableWrapper.callNext(this._valueChanges, this._value);
        this._updateParent();
    };
    ControlGroup.prototype._setValueErrorsStatus = function () {
        this._value = this._reduceValue();
        this._errors = this.validator(this);
        this._status = lang_1.isPresent(this._errors) ? exports.INVALID : exports.VALID;
    };
    ControlGroup.prototype._reduceValue = function () {
        return this._reduceChildren({}, function (acc, control, name) {
            acc[name] = control.value;
            return acc;
        });
    };
    ControlGroup.prototype._reduceChildren = function (initValue, fn) {
        var _this = this;
        var res = initValue;
        collection_1.StringMapWrapper.forEach(this.controls, function (control, name) {
            if (_this._included(name)) {
                res = fn(res, control, name);
            }
        });
        return res;
    };
    ControlGroup.prototype._included = function (controlName) {
        var isOptional = collection_1.StringMapWrapper.contains(this._optionals, controlName);
        return !isOptional || collection_1.StringMapWrapper.get(this._optionals, controlName);
    };
    return ControlGroup;
})(AbstractControl);
exports.ControlGroup = ControlGroup;
/**
 * Defines a part of a form, of variable length, that can contain other controls.
 *
 * A `ControlArray` aggregates the values and errors of each {@link Control} in the group. Thus, if
 * one of the controls
 * in a group is invalid, the entire group is invalid. Similarly, if a control changes its value,
 * the entire group
 * changes as well.
 *
 * `ControlArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with
 * {@link Control} and {@link ControlGroup}. {@link ControlGroup} can also contain other controls,
 * but is of fixed
 * length.
 *
 * @exportedAs angular2/forms
 */
var ControlArray = (function (_super) {
    __extends(ControlArray, _super);
    function ControlArray(controls, validator) {
        if (validator === void 0) { validator = validators_1.Validators.array; }
        _super.call(this, validator);
        this.controls = controls;
        this._valueChanges = new async_1.EventEmitter();
        this._setParentForControls();
        this._setValueErrorsStatus();
    }
    ControlArray.prototype.at = function (index) { return this.controls[index]; };
    ControlArray.prototype.push = function (control) {
        collection_1.ListWrapper.push(this.controls, control);
        control.setParent(this);
        this._updateValue();
    };
    ControlArray.prototype.insert = function (index, control) {
        collection_1.ListWrapper.insert(this.controls, index, control);
        control.setParent(this);
        this._updateValue();
    };
    ControlArray.prototype.removeAt = function (index) {
        collection_1.ListWrapper.removeAt(this.controls, index);
        this._updateValue();
    };
    Object.defineProperty(ControlArray.prototype, "length", {
        get: function () { return this.controls.length; },
        enumerable: true,
        configurable: true
    });
    ControlArray.prototype._updateValue = function () {
        this._setValueErrorsStatus();
        this._pristine = false;
        async_1.ObservableWrapper.callNext(this._valueChanges, this._value);
        this._updateParent();
    };
    ControlArray.prototype._setParentForControls = function () {
        var _this = this;
        collection_1.ListWrapper.forEach(this.controls, function (control) { control.setParent(_this); });
    };
    ControlArray.prototype._setValueErrorsStatus = function () {
        this._value = collection_1.ListWrapper.map(this.controls, function (c) { return c.value; });
        this._errors = this.validator(this);
        this._status = lang_1.isPresent(this._errors) ? exports.INVALID : exports.VALID;
    };
    return ControlArray;
})(AbstractControl);
exports.ControlArray = ControlArray;
exports.__esModule = true;
//# sourceMappingURL=model.js.map