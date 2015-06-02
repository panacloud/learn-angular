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
var di_1 = require('angular2/di');
var view_1 = require('angular2/src/core/annotations_impl/view');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var reflection_1 = require('angular2/src/reflection/reflection');
var TemplateResolver = (function () {
    function TemplateResolver() {
        this._cache = collection_1.MapWrapper.create();
    }
    TemplateResolver.prototype.resolve = function (component) {
        var view = collection_1.MapWrapper.get(this._cache, component);
        if (lang_1.isBlank(view)) {
            view = this._resolve(component);
            collection_1.MapWrapper.set(this._cache, component, view);
        }
        return view;
    };
    TemplateResolver.prototype._resolve = function (component) {
        var annotations = reflection_1.reflector.annotations(component);
        for (var i = 0; i < annotations.length; i++) {
            var annotation = annotations[i];
            if (annotation instanceof view_1.View) {
                return annotation;
            }
        }
        // No annotation = dynamic component!
        return null;
    };
    TemplateResolver = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TemplateResolver);
    return TemplateResolver;
})();
exports.TemplateResolver = TemplateResolver;
exports.__esModule = true;
//# sourceMappingURL=template_resolver.js.map