var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
var async_1 = require('angular2/src/facade/async');
var lang_1 = require('angular2/src/facade/lang');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var api_1 = require('../../api');
var compile_pipeline_1 = require('./compile_pipeline');
var template_loader_1 = require('angular2/src/render/dom/compiler/template_loader');
var compile_step_factory_1 = require('./compile_step_factory');
var change_detection_1 = require('angular2/change_detection');
var shadow_dom_strategy_1 = require('../shadow_dom/shadow_dom_strategy');
/**
 * The compiler loads and translates the html templates of components into
 * nested ProtoViews. To decompose its functionality it uses
 * the CompilePipeline and the CompileSteps.
 */
var DomCompiler = (function (_super) {
    __extends(DomCompiler, _super);
    function DomCompiler(stepFactory, templateLoader) {
        _super.call(this);
        this._templateLoader = templateLoader;
        this._stepFactory = stepFactory;
    }
    DomCompiler.prototype.compile = function (template) {
        var _this = this;
        var tplPromise = this._templateLoader.load(template);
        return async_1.PromiseWrapper.then(tplPromise, function (el) { return _this._compileTemplate(template, el, api_1.ProtoViewDto.COMPONENT_VIEW_TYPE); }, function (_) {
            throw new lang_1.BaseException("Failed to load the template \"" + template.componentId + "\"");
        });
    };
    DomCompiler.prototype.compileHost = function (directiveMetadata) {
        var hostViewDef = new api_1.ViewDefinition({
            componentId: directiveMetadata.id,
            absUrl: null, template: null,
            directives: [directiveMetadata]
        });
        var element = dom_adapter_1.DOM.createElement(directiveMetadata.selector);
        return this._compileTemplate(hostViewDef, element, api_1.ProtoViewDto.HOST_VIEW_TYPE);
    };
    DomCompiler.prototype._compileTemplate = function (viewDef, tplElement, protoViewType) {
        var subTaskPromises = [];
        var pipeline = new compile_pipeline_1.CompilePipeline(this._stepFactory.createSteps(viewDef, subTaskPromises));
        var compileElements = pipeline.process(tplElement, protoViewType, viewDef.componentId);
        var protoView = compileElements[0].inheritedProtoView.build();
        if (subTaskPromises.length > 0) {
            return async_1.PromiseWrapper.all(subTaskPromises).then(function (_) { return protoView; });
        }
        else {
            return async_1.PromiseWrapper.resolve(protoView);
        }
    };
    return DomCompiler;
})(api_1.RenderCompiler);
exports.DomCompiler = DomCompiler;
var DefaultDomCompiler = (function (_super) {
    __extends(DefaultDomCompiler, _super);
    function DefaultDomCompiler(parser, shadowDomStrategy, templateLoader) {
        _super.call(this, new compile_step_factory_1.DefaultStepFactory(parser, shadowDomStrategy), templateLoader);
    }
    DefaultDomCompiler = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [change_detection_1.Parser, shadow_dom_strategy_1.ShadowDomStrategy, template_loader_1.TemplateLoader])
    ], DefaultDomCompiler);
    return DefaultDomCompiler;
})(DomCompiler);
exports.DefaultDomCompiler = DefaultDomCompiler;
exports.__esModule = true;
//# sourceMappingURL=compiler.js.map