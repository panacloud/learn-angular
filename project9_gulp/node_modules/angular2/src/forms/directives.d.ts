import { ElementRef } from 'angular2/src/core/compiler/element_ref';
import { Renderer } from 'angular2/src/render/api';
import { Type } from 'angular2/src/facade/lang';
import { ControlGroup } from './model';
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
export declare class ControlGroupDirective {
    _groupDirective: ControlGroupDirective;
    _directives: List<ControlDirective>;
    _controlOrName: any;
    constructor(groupDirective: ControlGroupDirective);
    controlOrName: any;
    _updateDomValue(): void;
    addDirective(c: ControlDirective): void;
    findControl(name: string): any;
    _getControlGroup(): ControlGroup;
}
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
export declare class ControlDirective {
    _groupDirective: ControlGroupDirective;
    _controlOrName: any;
    valueAccessor: any;
    validator: Function;
    constructor(groupDirective: ControlGroupDirective);
    controlOrName: any;
    _updateDomValue(): void;
    _setUpUpdateControlValue(): void;
    _control(): any;
}
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
export declare class DefaultValueAccessor {
    private _elementRef;
    private _renderer;
    value: any;
    onChange: Function;
    constructor(cd: ControlDirective, _elementRef: ElementRef, _renderer: Renderer);
    writeValue(value: any): void;
}
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
export declare class SelectControlValueAccessor {
    private _elementRef;
    private _renderer;
    value: any;
    onChange: Function;
    constructor(cd: ControlDirective, _elementRef: ElementRef, _renderer: Renderer);
    writeValue(value: any): void;
}
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
export declare class CheckboxControlValueAccessor {
    private _elementRef;
    private _renderer;
    checked: boolean;
    onChange: Function;
    constructor(cd: ControlDirective, _elementRef: ElementRef, _renderer: Renderer);
    writeValue(value: any): void;
}
/**
 *
 * A list of all the form directives used as part of a `@View` annotation.
 *
 *  This is a shorthand for importing them each individually.
 *
 * @exportedAs angular2/forms
 */
export declare const formDirectives: List<Type>;
export declare var __esModule: boolean;
