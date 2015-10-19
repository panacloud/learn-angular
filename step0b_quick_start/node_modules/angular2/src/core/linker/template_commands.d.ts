import { Type } from 'angular2/src/core/facade/lang';
import { RenderTemplateCmd, RenderCommandVisitor, RenderBeginElementCmd, RenderTextCmd, RenderNgContentCmd, RenderBeginComponentCmd, RenderEmbeddedTemplateCmd } from 'angular2/src/core/render/render';
export declare function nextTemplateId(): number;
/**
 * A compiled host template.
 *
 * This is const as we are storing it as annotation
 * for the compiled component type.
 */
export declare class CompiledHostTemplate {
    private _templateGetter;
    constructor(_templateGetter: Function);
    getTemplate(): CompiledTemplate;
}
/**
 * A compiled template.
 */
export declare class CompiledTemplate {
    id: number;
    private _dataGetter;
    constructor(id: number, _dataGetter: Function);
    getData(appId: string): CompiledTemplateData;
}
export declare class CompiledTemplateData {
    changeDetectorFactory: Function;
    commands: TemplateCmd[];
    styles: string[];
    constructor(changeDetectorFactory: Function, commands: TemplateCmd[], styles: string[]);
}
export interface TemplateCmd extends RenderTemplateCmd {
    visit(visitor: RenderCommandVisitor, context: any): any;
}
export declare class TextCmd implements TemplateCmd, RenderTextCmd {
    value: string;
    isBound: boolean;
    ngContentIndex: number;
    constructor(value: string, isBound: boolean, ngContentIndex: number);
    visit(visitor: RenderCommandVisitor, context: any): any;
}
export declare function text(value: string, isBound: boolean, ngContentIndex: number): TextCmd;
export declare class NgContentCmd implements TemplateCmd, RenderNgContentCmd {
    index: number;
    ngContentIndex: number;
    isBound: boolean;
    constructor(index: number, ngContentIndex: number);
    visit(visitor: RenderCommandVisitor, context: any): any;
}
export declare function ngContent(index: number, ngContentIndex: number): NgContentCmd;
export interface IBeginElementCmd extends TemplateCmd, RenderBeginElementCmd {
    variableNameAndValues: Array<string | number>;
    eventTargetAndNames: string[];
    directives: Type[];
    visit(visitor: RenderCommandVisitor, context: any): any;
}
export declare class BeginElementCmd implements TemplateCmd, IBeginElementCmd, RenderBeginElementCmd {
    name: string;
    attrNameAndValues: string[];
    eventTargetAndNames: string[];
    variableNameAndValues: Array<string | number>;
    directives: Type[];
    isBound: boolean;
    ngContentIndex: number;
    constructor(name: string, attrNameAndValues: string[], eventTargetAndNames: string[], variableNameAndValues: Array<string | number>, directives: Type[], isBound: boolean, ngContentIndex: number);
    visit(visitor: RenderCommandVisitor, context: any): any;
}
export declare function beginElement(name: string, attrNameAndValues: string[], eventTargetAndNames: string[], variableNameAndValues: Array<string | number>, directives: Type[], isBound: boolean, ngContentIndex: number): BeginElementCmd;
export declare class EndElementCmd implements TemplateCmd {
    visit(visitor: RenderCommandVisitor, context: any): any;
}
export declare function endElement(): TemplateCmd;
export declare class BeginComponentCmd implements TemplateCmd, IBeginElementCmd, RenderBeginComponentCmd {
    name: string;
    attrNameAndValues: string[];
    eventTargetAndNames: string[];
    variableNameAndValues: Array<string | number>;
    directives: Type[];
    nativeShadow: boolean;
    ngContentIndex: number;
    template: CompiledTemplate;
    isBound: boolean;
    templateId: number;
    constructor(name: string, attrNameAndValues: string[], eventTargetAndNames: string[], variableNameAndValues: Array<string | number>, directives: Type[], nativeShadow: boolean, ngContentIndex: number, template: CompiledTemplate);
    visit(visitor: RenderCommandVisitor, context: any): any;
}
export declare function beginComponent(name: string, attrNameAnsValues: string[], eventTargetAndNames: string[], variableNameAndValues: Array<string | number>, directives: Type[], nativeShadow: boolean, ngContentIndex: number, template: CompiledTemplate): BeginComponentCmd;
export declare class EndComponentCmd implements TemplateCmd {
    visit(visitor: RenderCommandVisitor, context: any): any;
}
export declare function endComponent(): TemplateCmd;
export declare class EmbeddedTemplateCmd implements TemplateCmd, IBeginElementCmd, RenderEmbeddedTemplateCmd {
    attrNameAndValues: string[];
    variableNameAndValues: string[];
    directives: Type[];
    isMerged: boolean;
    ngContentIndex: number;
    changeDetectorFactory: Function;
    children: TemplateCmd[];
    isBound: boolean;
    name: string;
    eventTargetAndNames: string[];
    constructor(attrNameAndValues: string[], variableNameAndValues: string[], directives: Type[], isMerged: boolean, ngContentIndex: number, changeDetectorFactory: Function, children: TemplateCmd[]);
    visit(visitor: RenderCommandVisitor, context: any): any;
}
export declare function embeddedTemplate(attrNameAndValues: string[], variableNameAndValues: string[], directives: Type[], isMerged: boolean, ngContentIndex: number, changeDetectorFactory: Function, children: TemplateCmd[]): EmbeddedTemplateCmd;
export interface CommandVisitor extends RenderCommandVisitor {
    visitText(cmd: TextCmd, context: any): any;
    visitNgContent(cmd: NgContentCmd, context: any): any;
    visitBeginElement(cmd: BeginElementCmd, context: any): any;
    visitEndElement(context: any): any;
    visitBeginComponent(cmd: BeginComponentCmd, context: any): any;
    visitEndComponent(context: any): any;
    visitEmbeddedTemplate(cmd: EmbeddedTemplateCmd, context: any): any;
}
export declare function visitAllCommands(visitor: CommandVisitor, cmds: TemplateCmd[], context?: any): void;
