var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
var lang_1 = require('angular2/src/facade/lang');
var pipe_1 = require('./pipe');
/**
 * Implements json transforms to any object.
 *
 * # Example
 *
 * In this example we transform the user object to json.
 *
 *  ```
 * @Component({
 *   selector: "user-cmp"
 * })
 * @View({
 *   template: "User: {{ user | json }}"
 * })
 * class Username {
 *  user:Object
 *  constructor() {
 *    this.user = { name: "PatrickJS" };
 *  }
 * }
 *
 * ```
 *
 * @exportedAs angular2/pipes
 */
var JsonPipe = (function (_super) {
    __extends(JsonPipe, _super);
    function JsonPipe() {
        _super.call(this);
        this._latestRef = null;
        this._latestValue = null;
    }
    JsonPipe.prototype.onDestroy = function () {
        if (lang_1.isPresent(this._latestValue)) {
            this._latestRef = null;
            this._latestValue = null;
        }
    };
    JsonPipe.prototype.supports = function (obj) { return true; };
    JsonPipe.prototype.transform = function (value) {
        if (value === this._latestRef) {
            return this._latestValue;
        }
        else {
            return this._prettyPrint(value);
        }
    };
    JsonPipe.prototype._prettyPrint = function (value) {
        this._latestRef = value;
        this._latestValue = lang_1.Json.stringify(value);
        return this._latestValue;
    };
    return JsonPipe;
})(pipe_1.Pipe);
exports.JsonPipe = JsonPipe;
/**
 * Provides a factory for [JsonPipeFactory].
 *
 * @exportedAs angular2/pipes
 */
var JsonPipeFactory = (function (_super) {
    __extends(JsonPipeFactory, _super);
    function JsonPipeFactory() {
        _super.call(this);
    }
    JsonPipeFactory.prototype.supports = function (obj) { return true; };
    JsonPipeFactory.prototype.create = function (cdRef) { return new JsonPipe(); };
    JsonPipeFactory = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [])
    ], JsonPipeFactory);
    return JsonPipeFactory;
})(pipe_1.PipeFactory);
exports.JsonPipeFactory = JsonPipeFactory;
exports.__esModule = true;
//# sourceMappingURL=json_pipe.js.map