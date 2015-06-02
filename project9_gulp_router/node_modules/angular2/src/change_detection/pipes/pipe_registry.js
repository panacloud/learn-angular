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
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var decorators_1 = require('angular2/src/di/decorators');
var PipeRegistry = (function () {
    function PipeRegistry(config) {
        this.config = config;
    }
    PipeRegistry.prototype.get = function (type, obj, cdRef) {
        var listOfConfigs = this.config[type];
        if (lang_1.isBlank(listOfConfigs)) {
            throw new lang_1.BaseException("Cannot find '" + type + "' pipe supporting object '" + obj + "'");
        }
        var matchingConfig = collection_1.ListWrapper.find(listOfConfigs, function (pipeConfig) { return pipeConfig.supports(obj); });
        if (lang_1.isBlank(matchingConfig)) {
            throw new lang_1.BaseException("Cannot find '" + type + "' pipe supporting object '" + obj + "'");
        }
        return matchingConfig.create(cdRef);
    };
    PipeRegistry = __decorate([
        decorators_1.Injectable(), 
        __metadata('design:paramtypes', [Object])
    ], PipeRegistry);
    return PipeRegistry;
})();
exports.PipeRegistry = PipeRegistry;
exports.__esModule = true;
//# sourceMappingURL=pipe_registry.js.map