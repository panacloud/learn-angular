import { Injector, Binding } from 'angular2/di';
import * as eli from './element_injector';
import * as viewModule from './view';
import * as avmModule from './view_manager';
import { Renderer } from 'angular2/src/render/api';
import { Locals } from 'angular2/change_detection';
import { DirectiveResolver } from './directive_resolver';
import { RenderViewRef } from 'angular2/src/render/api';
export declare class AppViewManagerUtils {
    _directiveResolver: DirectiveResolver;
    constructor(metadataReader: DirectiveResolver);
    getComponentInstance(parentView: viewModule.AppView, boundElementIndex: number): any;
    createView(protoView: viewModule.AppProtoView, renderView: RenderViewRef, viewManager: avmModule.AppViewManager, renderer: Renderer): viewModule.AppView;
    attachComponentView(hostView: viewModule.AppView, boundElementIndex: number, componentView: viewModule.AppView): void;
    detachComponentView(hostView: viewModule.AppView, boundElementIndex: number): void;
    hydrateComponentView(hostView: viewModule.AppView, boundElementIndex: number, injector?: Injector): void;
    hydrateRootHostView(hostView: viewModule.AppView, injector?: Injector): void;
    attachAndHydrateFreeHostView(parentComponentHostView: viewModule.AppView, parentComponentBoundElementIndex: number, hostView: viewModule.AppView, injector?: Injector): void;
    detachFreeHostView(parentView: viewModule.AppView, hostView: viewModule.AppView): void;
    attachViewInContainer(parentView: viewModule.AppView, boundElementIndex: number, contextView: viewModule.AppView, contextBoundElementIndex: number, atIndex: number, view: viewModule.AppView): void;
    detachViewInContainer(parentView: viewModule.AppView, boundElementIndex: number, atIndex: number): void;
    hydrateViewInContainer(parentView: viewModule.AppView, boundElementIndex: number, contextView: viewModule.AppView, contextBoundElementIndex: number, atIndex: number, injector: Injector): void;
    hydrateDynamicComponentInElementInjector(hostView: viewModule.AppView, boundElementIndex: number, componentBinding: Binding, injector?: Injector): void;
    _hydrateView(view: viewModule.AppView, appInjector: Injector, hostElementInjector: eli.ElementInjector, context: Object, parentLocals: Locals): void;
    _setUpEventEmitters(view: viewModule.AppView, elementInjector: eli.ElementInjector, boundElementIndex: number): void;
    _setUpHostActions(view: viewModule.AppView, elementInjector: eli.ElementInjector, boundElementIndex: number): void;
    dehydrateView(view: viewModule.AppView): void;
}
export declare var __esModule: boolean;
