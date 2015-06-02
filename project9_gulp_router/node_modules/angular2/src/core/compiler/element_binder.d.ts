import { AST } from 'angular2/change_detection';
import * as eiModule from './element_injector';
import { DirectiveBinding } from './element_injector';
import * as viewModule from './view';
export declare class ElementBinder {
    index: int;
    parent: ElementBinder;
    distanceToParent: int;
    protoElementInjector: eiModule.ProtoElementInjector;
    componentDirective: DirectiveBinding;
    nestedProtoView: viewModule.AppProtoView;
    hostListeners: StringMap<string, Map<number, AST>>;
    constructor(index: int, parent: ElementBinder, distanceToParent: int, protoElementInjector: eiModule.ProtoElementInjector, componentDirective: DirectiveBinding);
    hasStaticComponent(): boolean;
    hasDynamicComponent(): boolean;
    hasEmbeddedProtoView(): boolean;
}
export declare var __esModule: boolean;
