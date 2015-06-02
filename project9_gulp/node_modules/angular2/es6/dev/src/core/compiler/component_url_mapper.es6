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
import { isPresent } from 'angular2/src/facade/lang';
import { MapWrapper } from 'angular2/src/facade/collection';
export let ComponentUrlMapper = class {
    // Returns the base URL to the component source file.
    // The returned URL could be:
    // - an absolute URL,
    // - a path relative to the application
    getUrl(component) { return './'; }
};
ComponentUrlMapper = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], ComponentUrlMapper);
export class RuntimeComponentUrlMapper extends ComponentUrlMapper {
    constructor() {
        super();
        this._componentUrls = MapWrapper.create();
    }
    setComponentUrl(component, url) {
        MapWrapper.set(this._componentUrls, component, url);
    }
    getUrl(component) {
        var url = MapWrapper.get(this._componentUrls, component);
        if (isPresent(url))
            return url;
        return super.getUrl(component);
    }
}
//# sourceMappingURL=component_url_mapper.js.map