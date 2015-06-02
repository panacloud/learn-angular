var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var decorators_1 = require('angular2/src/core/annotations/decorators');
var decorators_2 = require('angular2/src/di/decorators');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var api_1 = require('angular2/src/render/api');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var model_1 = require('./model');
var validators_1 = require('./validators');
function _lookupControl(groupDirective, controlOrName) {
    if (model_1.isControl(controlOrName)) {
        return controlOrName;
    }
    if (lang_1.isBlank(groupDirective)) {
        throw new lang_1.BaseException("No control group found for \"" + controlOrName + "\"");
    }
    var control = groupDirective.findControl(controlOrName);
    if (lang_1.isBlank(control)) {
        throw new lang_1.BaseException("Cannot find control \"" + controlOrName + "\"");
    }
    return control;
}
/**
 * Binds a control group to a DOM element.
 *
 * # Example
 *
 * In this example, we bind the control group to the form element, and we bind the login and
 * password controls to the
 * login and password elements.
 *
 * Here we use {@link formDirectives}, rather than importing each form directive individually, e.g.
 * `ControlDirective`, `ControlGroupDirective`. This is just a shorthand for the same end result.
 *
 *  ```
 * @Component({selector: "login-comp"})
 * @View({
 *      directives: [formDirectives],
 *      inline: "<form [control-group]='loginForm'>" +
 *              "Login <input type='text' control='login'>" +
 *              "Password <input type='password' control='password'>" +
 *              "<button (click)="onLogin()">Login</button>" +
 *              "</form>"
 *      })
 * class LoginComp {
 *  loginForm:ControlGroup;
 *
 *  constructor() {
 *    this.loginForm = new ControlGroup({
 *      login: new Control(""),
 *      password: new Control("")
 *    });
 *  }
 *
 *  onLogin() {
 *    // this.loginForm.value
 *  }
 * }
 *
 *  ```
 *
 * @exportedAs angular2/forms
 */
var ControlGroupDirective = (function () {
    function ControlGroupDirective(groupDirective) {
        this._groupDirective = groupDirective;
        this._directives = collection_1.ListWrapper.create();
    }
    Object.defineProperty(ControlGroupDirective.prototype, "controlOrName", {
        set: function (controlOrName) {
            this._controlOrName = controlOrName;
            this._updateDomValue();
        },
        enumerable: true,
        configurable: true
    });
    ControlGroupDirective.prototype._updateDomValue = function () { collection_1.ListWrapper.forEach(this._directives, function (cd) { return cd._updateDomValue(); }); };
    ControlGroupDirective.prototype.addDirective = function (c) { collection_1.ListWrapper.push(this._directives, c); };
    ControlGroupDirective.prototype.findControl = function (name) { return this._getControlGroup().controls[name]; };
    ControlGroupDirective.prototype._getControlGroup = function () {
        return _lookupControl(this._groupDirective, this._controlOrName);
    };
    ControlGroupDirective = __decorate([
        decorators_1.Directive({ selector: '[control-group]', properties: { 'controlOrName': 'control-group' } }),
        __param(0, decorators_2.Optional()),
        __param(0, decorators_1.Ancestor()), 
        __metadata('design:paramtypes', [ControlGroupDirective])
    ], ControlGroupDirective);
    return ControlGroupDirective;
})();
exports.ControlGroupDirective = ControlGroupDirective;
/**
 * Binds a control to a DOM element.
 *
 * # Example
 *
 * In this example, we bind the control to an input element. When the value of the input element
 * changes, the value of
 * the control will reflect that change. Likewise, if the value of the control changes, the input
 * element reflects that
 * change.
 *
 * Here we use {@link formDirectives}, rather than importing each form directive individually, e.g.
 * `ControlDirective`, `ControlGroupDirective`. This is just a shorthand for the same end result.
 *
 *  ```
 * @Component({selector: "login-comp"})
 * @View({
 *      directives: [formDirectives],
 *      inline: "<input type='text' [control]='loginControl'>"
 *      })
 * class LoginComp {
 *  loginControl:Control;
 *
 *  constructor() {
 *    this.loginControl = new Control('');
 *  }
 * }
 *
 *  ```
 *
 * @exportedAs angular2/forms
 */
var ControlDirective = (function () {
    function ControlDirective(groupDirective) {
        this._groupDirective = groupDirective;
        this._controlOrName = null;
        this.validator = validators_1.Validators.nullValidator;
    }
    Object.defineProperty(ControlDirective.prototype, "controlOrName", {
        set: function (controlOrName) {
            this._controlOrName = controlOrName;
            if (lang_1.isPresent(this._groupDirective)) {
                this._groupDirective.addDirective(this);
            }
            var c = this._control();
            c.validator = validators_1.Validators.compose([c.validator, this.validator]);
            if (lang_1.isBlank(this.valueAccessor)) {
                throw new lang_1.BaseException("Cannot find value accessor for control \"" + controlOrName + "\"");
            }
            this._updateDomValue();
            this._setUpUpdateControlValue();
        },
        enumerable: true,
        configurable: true
    });
    ControlDirective.prototype._updateDomValue = function () { this.valueAccessor.writeValue(this._control().value); };
    ControlDirective.prototype._setUpUpdateControlValue = function () {
        var _this = this;
        this.valueAccessor.onChange = function (newValue) { return _this._control().updateValue(newValue); };
    };
    ControlDirective.prototype._control = function () { return _lookupControl(this._groupDirective, this._controlOrName); };
    ControlDirective = __decorate([
        decorators_1.Directive({ selector: '[control]', properties: { 'controlOrName': 'control' } }),
        __param(0, decorators_2.Optional()),
        __param(0, decorators_1.Ancestor()), 
        __metadata('design:paramtypes', [ControlGroupDirective])
    ], ControlDirective);
    return ControlDirective;
})();
exports.ControlDirective = ControlDirective;
/**
 * The default accessor for writing a value and listening to changes that is used by a {@link
  * Control} directive.
 *
 * This is the default strategy that Angular uses when no other accessor is applied.
 *
 *  # Example
 *  ```
 *  <input type="text" [control]="loginControl">
 *  ```
 *
 * @exportedAs angular2/forms
 */
var DefaultValueAccessor = (function () {
    function DefaultValueAccessor(cd, _elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.value = null;
        this.onChange = function (_) { };
        cd.valueAccessor = this;
    }
    DefaultValueAccessor.prototype.writeValue = function (value) {
        this._renderer.setElementProperty(this._elementRef.parentView.render, this._elementRef.boundElementIndex, 'value', value);
    };
    DefaultValueAccessor = __decorate([
        decorators_1.Directive({
            selector: 'input:not([type=checkbox])[control],textarea[control]',
            hostListeners: { 'change': 'onChange($event.target.value)', 'input': 'onChange($event.target.value)' },
            hostProperties: { 'value': 'value' }
        }), 
        __metadata('design:paramtypes', [ControlDirective, element_ref_1.ElementRef, api_1.Renderer])
    ], DefaultValueAccessor);
    return DefaultValueAccessor;
})();
exports.DefaultValueAccessor = DefaultValueAccessor;
/**
 * The accessor for writing a value and listening to changes that is used by a {@link
  * Control} directive.
 *
 * This is the default strategy that Angular uses when no other accessor is applied.
 *
 *  # Example
 *  ```
 *  <input type="text" [control]="loginControl">
 *  ```
 *
 * @exportedAs angular2/forms
 */
var SelectControlValueAccessor = (function () {
    function SelectControlValueAccessor(cd, _elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.value = null;
        this.onChange = function (_) { };
        this.value = '';
        cd.valueAccessor = this;
    }
    SelectControlValueAccessor.prototype.writeValue = function (value) {
        this._renderer.setElementProperty(this._elementRef.parentView.render, this._elementRef.boundElementIndex, 'value', value);
    };
    SelectControlValueAccessor = __decorate([
        decorators_1.Directive({
            selector: 'select[control]',
            hostListeners: { 'change': 'onChange($event.target.value)', 'input': 'onChange($event.target.value)' },
            hostProperties: { 'value': 'value' }
        }), 
        __metadata('design:paramtypes', [ControlDirective, element_ref_1.ElementRef, api_1.Renderer])
    ], SelectControlValueAccessor);
    return SelectControlValueAccessor;
})();
exports.SelectControlValueAccessor = SelectControlValueAccessor;
/**
 * The accessor for writing a value and listening to changes on a checkbox input element.
 *
 *
 *  # Example
 *  ```
 *  <input type="checkbox" [control]="rememberLogin">
 *  ```
 *
 * @exportedAs angular2/forms
 */
var CheckboxControlValueAccessor = (function () {
    function CheckboxControlValueAccessor(cd, _elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.onChange = function (_) { };
        cd.valueAccessor = this;
    }
    CheckboxControlValueAccessor.prototype.writeValue = function (value) {
        this._renderer.setElementProperty(this._elementRef.parentView.render, this._elementRef.boundElementIndex, 'checked', value);
    };
    CheckboxControlValueAccessor = __decorate([
        decorators_1.Directive({
            selector: 'input[type=checkbox][control]',
            hostListeners: { 'change': 'onChange($event.target.checked)' },
            hostProperties: { 'checked': 'checked' }
        }), 
        __metadata('design:paramtypes', [ControlDirective, element_ref_1.ElementRef, api_1.Renderer])
    ], CheckboxControlValueAccessor);
    return CheckboxControlValueAccessor;
})();
exports.CheckboxControlValueAccessor = CheckboxControlValueAccessor;
/**
 *
 * A list of all the form directives used as part of a `@View` annotation.
 *
 *  This is a shorthand for importing them each individually.
 *
 * @exportedAs angular2/forms
 */
exports.formDirectives = lang_1.CONST_EXPR([
    ControlGroupDirective,
    ControlDirective,
    CheckboxControlValueAccessor,
    DefaultValueAccessor,
    SelectControlValueAccessor
]);
exports.__esModule = true;
//# sourceMappingURL=directives.js.map