import * as modelModule from './model';
/**
 * Creates a form object from a user-specified configuration.
 *
 * # Example
 *
 * ```
 * import {Component, bootstrap} from 'angular2/angular2';
 * import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup} from 'angular2/core';
 *
 * @Component({
 *   selector: 'login-comp',
 *   viewProviders: [FormBuilder],
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
 *   directives: [FORM_DIRECTIVES]
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
 * bootstrap(LoginComp);
 * ```
 *
 * This example creates a {@link ControlGroup} that consists of a `login` {@link Control}, and a
 * nested {@link ControlGroup} that defines a `password` and a `passwordConfirmation`
 * {@link Control}:
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
 */
export declare class FormBuilder {
    group(controlsConfig: {
        [key: string]: any;
    }, extra?: {
        [key: string]: any;
    }): modelModule.ControlGroup;
    control(value: Object, validator?: Function): modelModule.Control;
    array(controlsConfig: any[], validator?: Function): modelModule.ControlArray;
}
