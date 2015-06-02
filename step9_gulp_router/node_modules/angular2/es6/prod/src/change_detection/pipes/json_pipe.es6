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
import { isPresent, CONST, Json } from 'angular2/src/facade/lang';
import { Pipe, PipeFactory } from './pipe';
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
export class JsonPipe extends Pipe {
    constructor() {
        super();
        this._latestRef = null;
        this._latestValue = null;
    }
    onDestroy() {
        if (isPresent(this._latestValue)) {
            this._latestRef = null;
            this._latestValue = null;
        }
    }
    supports(obj) { return true; }
    transform(value) {
        if (value === this._latestRef) {
            return this._latestValue;
        }
        else {
            return this._prettyPrint(value);
        }
    }
    _prettyPrint(value) {
        this._latestRef = value;
        this._latestValue = Json.stringify(value);
        return this._latestValue;
    }
}
/**
 * Provides a factory for [JsonPipeFactory].
 *
 * @exportedAs angular2/pipes
 */
export let JsonPipeFactory = class extends PipeFactory {
    constructor() {
        super();
    }
    supports(obj) { return true; }
    create(cdRef) { return new JsonPipe(); }
};
JsonPipeFactory = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [])
], JsonPipeFactory);
//# sourceMappingURL=json_pipe.js.map