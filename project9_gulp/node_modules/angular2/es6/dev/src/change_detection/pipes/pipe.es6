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
import { BaseException, CONST } from 'angular2/src/facade/lang';
/**
 * Indicates that the result of a {@link Pipe} transformation has changed even though the reference
 *has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * @exportedAs angular2/pipes
 */
export class WrappedValue {
    constructor(wrapped) {
        this.wrapped = wrapped;
    }
    static wrap(value) {
        var w = _wrappedValues[_wrappedIndex++ % 5];
        w.wrapped = value;
        return w;
    }
}
var _wrappedValues = [
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null)
];
var _wrappedIndex = 0;
/**
 * An interface for extending the list of pipes known to Angular.
 *
 * If you are writing a custom {@link Pipe}, you must extend this interface.
 *
 * #Example
 *
 * ```
 * class DoublePipe extends Pipe {
 *  supports(obj) {
 *    return true;
 *  }
 *
 *  transform(value) {
 *    return `${value}${value}`;
 *  }
 * }
 * ```
 *
 * @exportedAs angular2/pipes
 */
export class Pipe {
    supports(obj) { return false; }
    onDestroy() { }
    transform(value) { return null; }
}
// TODO: vsavkin: make it an interface
export let PipeFactory = class {
    supports(obs) {
        _abstract();
        return false;
    }
    create(cdRef) {
        _abstract();
        return null;
    }
};
PipeFactory = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [])
], PipeFactory);
function _abstract() {
    throw new BaseException('This method is abstract');
}
//# sourceMappingURL=pipe.js.map