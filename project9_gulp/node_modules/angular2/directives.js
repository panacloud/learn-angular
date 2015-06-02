/**
 * @module
 * @public
 * @description
 * Common directives shipped with Angular.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var lang_1 = require('./src/facade/lang');
var ng_for_1 = require('./src/directives/ng_for');
var ng_if_1 = require('./src/directives/ng_if');
var ng_non_bindable_1 = require('./src/directives/ng_non_bindable');
var ng_switch_1 = require('./src/directives/ng_switch');
__export(require('./src/directives/class'));
__export(require('./src/directives/ng_for'));
__export(require('./src/directives/ng_if'));
__export(require('./src/directives/ng_non_bindable'));
__export(require('./src/directives/ng_switch'));
/**
 * A collection of the Angular core directives that are likely to be used in each and every Angular
 * application.
 *
 * This collection can be used to quickly enumerate all the built-in directives in the `@View`
 * annotation. For example,
 * instead of writing:
 *
 * ```
 * import {If, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/angular2';
 * import {OtherDirective} from 'myDirectives';
 *
 * @Component({
 *  selector: 'my-component'
 * })
 * @View({
 *   templateUrl: 'myComponent.html',
 *   directives: [If, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, OtherDirective]
 * })
 * export class MyComponent {
 *   ...
 * }
 * ```
 * one could enumerate all the core directives at once:
 *
 * ```
 * import {coreDirectives} from 'angular2/angular2';
 * import {OtherDirective} from 'myDirectives';
 *
 * @Component({
 *  selector: 'my-component'
 * })
 * @View({
 *   templateUrl: 'myComponent.html',
 *   directives: [coreDirectives, OtherDirective]
 * })
 * export class MyComponent {
 *   ...
 * }
 * ```
 *
 */
exports.coreDirectives = lang_1.CONST_EXPR([ng_for_1.NgFor, ng_if_1.NgIf, ng_non_bindable_1.NgNonBindable, ng_switch_1.NgSwitch, ng_switch_1.NgSwitchWhen, ng_switch_1.NgSwitchDefault]);
exports.__esModule = true;
//# sourceMappingURL=directives.js.map