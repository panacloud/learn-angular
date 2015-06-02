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
import { ObservableWrapper } from 'angular2/src/facade/async';
import { isBlank, isPresent, CONST } from 'angular2/src/facade/lang';
import { Pipe, WrappedValue, PipeFactory } from './pipe';
/**
 * Implements async bindings to Observable.
 *
 * # Example
 *
 * In this example we bind the description observable to the DOM. The async pipe will convert an
 *observable to the
 * latest value it emitted. It will also request a change detection check when a new value is
 *emitted.
 *
 *  ```
 * @Component({
 *   selector: "task-cmp",
 *   changeDetection: ON_PUSH
 * })
 * @View({
 *   template: "Task Description {{ description | async }}"
 * })
 * class Task {
 *  description:Observable<string>;
 * }
 *
 * ```
 *
 * @exportedAs angular2/pipes
 */
export class ObservablePipe extends Pipe {
    constructor(ref) {
        super();
        this._ref = ref;
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._observable = null;
    }
    supports(obs) { return ObservableWrapper.isObservable(obs); }
    onDestroy() {
        if (isPresent(this._subscription)) {
            this._dispose();
        }
    }
    transform(obs) {
        if (isBlank(this._subscription)) {
            this._subscribe(obs);
            return null;
        }
        if (obs !== this._observable) {
            this._dispose();
            return this.transform(obs);
        }
        if (this._latestValue === this._latestReturnedValue) {
            return this._latestReturnedValue;
        }
        else {
            this._latestReturnedValue = this._latestValue;
            return WrappedValue.wrap(this._latestValue);
        }
    }
    _subscribe(obs) {
        this._observable = obs;
        this._subscription = ObservableWrapper.subscribe(obs, value => { this._updateLatestValue(value); }, e => { throw e; });
    }
    _dispose() {
        ObservableWrapper.dispose(this._subscription);
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._observable = null;
    }
    _updateLatestValue(value) {
        this._latestValue = value;
        this._ref.requestCheck();
    }
}
/**
 * Provides a factory for [ObervablePipe].
 *
 * @exportedAs angular2/pipes
 */
export let ObservablePipeFactory = class extends PipeFactory {
    constructor() {
        super();
    }
    supports(obs) { return ObservableWrapper.isObservable(obs); }
    create(cdRef) { return new ObservablePipe(cdRef); }
};
ObservablePipeFactory = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [])
], ObservablePipeFactory);
//# sourceMappingURL=observable_pipe.js.map