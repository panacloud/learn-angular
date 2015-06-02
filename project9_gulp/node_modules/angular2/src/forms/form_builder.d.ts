import * as modelModule from './model';
/**
 * Creates a form object from a user-specified configuration.
 *
 * # Example
 *
 * ```
 * import {Component, View, bootstrap} from 'angular2/angular2';
 * import {FormBuilder, Validators, formDirectives, ControlGroup} from 'angular2/forms';
 *
 * @Component({
 *   selector: 'login-comp',
 *   appInjector: [
 *     FormBuilder
 *   ]
 * })
 * @View({
 *   template: `
 *     <form [control-group]="loginForm">
 *       Login <input control="login">
 *
 *       <div control-group="passwordRetry">
 *         Password <input type="password" control="password">
 *         Confirm password <input type="password" control="passwordConfirmation">
 *       </div>
 *     </form>
 *   `,
 *   directives: [
 *     formDirectives
 *   ]
 * })
 * class LoginComp {
 *   loginForm: ControlGroup;
 *
 *   constructor(builder: FormBuilder) {
 *     this.loginForm = builder.group({
 *       login: ["", Validators.required],
 *
 *       passwordRetry: builder.group({
 *         password: ["", Validators.required],
 *         passwordConfirmation: ["", Validators.required]
 *       })
 *     });
 *   }
 * }
 *
 * bootstrap(LoginComp)
 * ```
 *
 * This example creates a {@link ControlGroup} that consists of a `login` {@link Control}, and a
 * nested
 * {@link ControlGroup} that defines a `password` and a `passwordConfirmation` {@link Control}:
 *
 * ```
 *  var loginForm = builder.group({
 *    login: ["", Validators.required],
 *
 *    passwordRetry: builder.group({
 *      password: ["", Validators.required],
 *      passwordConfirmation: ["", Validators.required]
 *    })
 *  });
 *
 *  ```
 * @exportedAs angular2/forms
 */
export declare class FormBuilder {
    group(controlsConfig: StringMap<string, any>, extra?: StringMap<string, any>): modelModule.ControlGroup;
    control(value: Object, validator?: Function): modelModule.Control;
    array(controlsConfig: List<any>, validator?: Function): modelModule.ControlArray;
    _reduceControls(controlsConfig: any): StringMap<string, modelModule.AbstractControl>;
    _createControl(controlConfig: any): modelModule.AbstractControl;
}
export declare var __esModule: boolean;
