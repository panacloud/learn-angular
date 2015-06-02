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
import { resolveForwardRef, Injectable } from 'angular2/di';
import { isPresent, BaseException, stringify } from 'angular2/src/facade/lang';
import { Directive } from '../annotations_impl/annotations';
import { reflector } from 'angular2/src/reflection/reflection';
export let DirectiveResolver = class {
    resolve(type) {
        var annotations = reflector.annotations(resolveForwardRef(type));
        if (isPresent(annotations)) {
            for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation instanceof Directive) {
                    return annotation;
                }
            }
        }
        throw new BaseException(`No Directive annotation found on ${stringify(type)}`);
    }
};
DirectiveResolver = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], DirectiveResolver);
//# sourceMappingURL=directive_resolver.js.map