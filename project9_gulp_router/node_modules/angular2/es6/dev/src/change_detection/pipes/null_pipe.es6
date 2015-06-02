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
import { isBlank, CONST } from 'angular2/src/facade/lang';
import { Pipe, WrappedValue, PipeFactory } from './pipe';
/**
 * @exportedAs angular2/pipes
 */
export let NullPipeFactory = class extends PipeFactory {
    constructor() {
        super();
    }
    supports(obj) { return NullPipe.supportsObj(obj); }
    create(cdRef) { return new NullPipe(); }
};
NullPipeFactory = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [])
], NullPipeFactory);
/**
 * @exportedAs angular2/pipes
 */
export class NullPipe extends Pipe {
    constructor() {
        super();
        this.called = false;
    }
    static supportsObj(obj) { return isBlank(obj); }
    supports(obj) { return NullPipe.supportsObj(obj); }
    transform(value) {
        if (!this.called) {
            this.called = true;
            return WrappedValue.wrap(null);
        }
        else {
            return null;
        }
    }
}
//# sourceMappingURL=null_pipe.js.map