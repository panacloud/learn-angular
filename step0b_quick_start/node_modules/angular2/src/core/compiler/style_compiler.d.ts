import { CompileTemplateMetadata } from './directive_metadata';
import { SourceModule, SourceExpression } from './source_module';
import { XHR } from 'angular2/src/core/compiler/xhr';
import { Promise } from 'angular2/src/core/facade/async';
import { UrlResolver } from 'angular2/src/core/compiler/url_resolver';
export declare class StyleCompiler {
    private _xhr;
    private _urlResolver;
    private _styleCache;
    private _shadowCss;
    constructor(_xhr: XHR, _urlResolver: UrlResolver);
    compileComponentRuntime(appId: string, templateId: number, template: CompileTemplateMetadata): Promise<string[]>;
    compileComponentCodeGen(appIdExpression: string, templateIdExpression: string, template: CompileTemplateMetadata): SourceExpression;
    compileStylesheetCodeGen(stylesheetUrl: string, cssText: string): SourceModule[];
    clearCache(): void;
    private _loadStyles(plainStyles, absUrls, encapsulate);
    private _styleCodeGen(plainStyles, absUrls, shim, suffix);
    private _styleModule(stylesheetUrl, shim, expression);
    private _shimIfNeeded(style, shim);
    private _createModuleUrl(stylesheetUrl, shim);
}
export declare function shimContentAttribute(appId: string, templateId: number): string;
export declare function shimContentAttributeExpr(appIdExpr: string, templateIdExpr: string): string;
export declare function shimHostAttribute(appId: string, templateId: number): string;
export declare function shimHostAttributeExpr(appIdExpr: string, templateIdExpr: string): string;
