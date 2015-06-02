var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var lang_1 = require('angular2/src/facade/lang');
var pipe_1 = require('./pipe');
/**
 * Implements lowercase transforms to text.
 *
 * # Example
 *
 * In this example we transform the user text lowercase.
 *
 *  ```
 * @Component({
 *   selector: "username-cmp"
 * })
 * @View({
 *   template: "Username: {{ user | lowercase }}"
 * })
 * class Username {
 *   user:string;
 * }
 *
 * ```
 *
 * @exportedAs angular2/pipes
 */
var LowerCasePipe = (function (_super) {
    __extends(LowerCasePipe, _super);
    function LowerCasePipe() {
        _super.call(this);
        this._latestValue = null;
    }
    LowerCasePipe.prototype.supports = function (str) { return lang_1.isString(str); };
    LowerCasePipe.prototype.onDestroy = function () { this._latestValue = null; };
    LowerCasePipe.prototype.transform = function (value) {
        if (this._latestValue !== value) {
            this._latestValue = value;
            return lang_1.StringWrapper.toLowerCase(value);
        }
        else {
            return this._latestValue;
        }
    };
    return LowerCasePipe;
})(pipe_1.Pipe);
exports.LowerCasePipe = LowerCasePipe;
/**
 * @exportedAs angular2/pipes
 */
var LowerCaseFactory = (function () {
    function LowerCaseFactory() {
    }
    LowerCaseFactory.prototype.supports = function (str) { return lang_1.isString(str); };
    LowerCaseFactory.prototype.create = function () { return new LowerCasePipe(); };
    return LowerCaseFactory;
})();
exports.LowerCaseFactory = LowerCaseFactory;
exports.__esModule = true;
//# sourceMappingURL=lowercase_pipe.js.map