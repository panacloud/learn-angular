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
import { Injectable } from 'angular2/di';
import { View } from 'angular2/src/core/annotations_impl/view';
import { isBlank } from 'angular2/src/facade/lang';
import { MapWrapper } from 'angular2/src/facade/collection';
import { reflector } from 'angular2/src/reflection/reflection';
export let TemplateResolver = class {
    constructor() {
        this._cache = MapWrapper.create();
    }
    resolve(component) {
        var view = MapWrapper.get(this._cache, component);
        if (isBlank(view)) {
            view = this._resolve(component);
            MapWrapper.set(this._cache, component, view);
        }
        return view;
    }
    _resolve(component) {
        var annotations = reflector.annotations(component);
        for (var i = 0; i < annotations.length; i++) {
            var annotation = annotations[i];
            if (annotation instanceof View) {
                return annotation;
            }
        }
        // No annotation = dynamic component!
        return null;
    }
};
TemplateResolver = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], TemplateResolver);
//# sourceMappingURL=template_resolver.js.map