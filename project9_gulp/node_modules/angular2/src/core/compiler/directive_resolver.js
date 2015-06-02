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
var lang_1 = require('angular2/src/facade/lang');
var annotations_1 = require('../annotations_impl/annotations');
var reflection_1 = require('angular2/src/reflection/reflection');
var DirectiveResolver = (function () {
    function DirectiveResolver() {
    }
    DirectiveResolver.prototype.resolve = function (type) {
        var annotations = reflection_1.reflector.annotations(di_1.resolveForwardRef(type));
        if (lang_1.isPresent(annotations)) {
            for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation instanceof annotations_1.Directive) {
                    return annotation;
                }
            }
        }
        throw new lang_1.BaseException("No Directive annotation found on " + lang_1.stringify(type));
    };
    DirectiveResolver = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveResolver);
    return DirectiveResolver;
})();
exports.DirectiveResolver = DirectiveResolver;
exports.__esModule = true;
//# sourceMappingURL=directive_resolver.js.map