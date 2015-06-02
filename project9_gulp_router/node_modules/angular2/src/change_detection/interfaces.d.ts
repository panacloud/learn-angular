import { Locals } from './parser/locals';
import { BindingRecord } from './binding_record';
import { DirectiveRecord } from './directive_record';
export declare class ProtoChangeDetector {
    instantiate(dispatcher: any): ChangeDetector;
}
/**
 * Interface used by Angular to control the change detection strategy for an application.
 *
 * Angular implements the following change detection strategies by default:
 *
 * - {@link DynamicChangeDetection}: slower, but does not require `eval()`.
 * - {@link JitChangeDetection}: faster, but requires `eval()`.
 *
 * In JavaScript, you should always use `JitChangeDetection`, unless you are in an environment that
 *has
 * [CSP](https://developer.mozilla.org/en-US/docs/Web/Security/CSP), such as a Chrome Extension.
 *
 * In Dart, use `DynamicChangeDetection` during development. The Angular transformer generates an
 *analog to the
 * `JitChangeDetection` strategy at compile time.
 *
 *
 * See: {@link DynamicChangeDetection}, {@link JitChangeDetection}
 *
 * # Example
 * ```javascript
 * bootstrap(MyApp, [bind(ChangeDetection).toClass(DynamicChangeDetection)]);
 * ```
 * @exportedAs angular2/change_detection
 */
export declare class ChangeDetection {
    createProtoChangeDetector(definition: ChangeDetectorDefinition): ProtoChangeDetector;
}
export declare class ChangeDispatcher {
    notifyOnBinding(bindingRecord: BindingRecord, value: any): void;
}
export declare class ChangeDetector {
    parent: ChangeDetector;
    mode: string;
    addChild(cd: ChangeDetector): void;
    addShadowDomChild(cd: ChangeDetector): void;
    removeChild(cd: ChangeDetector): void;
    removeShadowDomChild(cd: ChangeDetector): void;
    remove(): void;
    hydrate(context: any, locals: Locals, directives: any): void;
    dehydrate(): void;
    markPathToRootAsCheckOnce(): void;
    detectChanges(): void;
    checkNoChanges(): void;
}
export declare class ChangeDetectorDefinition {
    id: string;
    strategy: string;
    variableNames: List<string>;
    bindingRecords: List<BindingRecord>;
    directiveRecords: List<DirectiveRecord>;
    constructor(id: string, strategy: string, variableNames: List<string>, bindingRecords: List<BindingRecord>, directiveRecords: List<DirectiveRecord>);
}
export declare var __esModule: boolean;
