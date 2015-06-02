import { Injector } from 'angular2/di';
import { Compiler } from './compiler';
import { AppViewManager } from 'angular2/src/core/compiler/view_manager';
import { ElementRef } from './element_ref';
import { ViewRef } from './view_ref';
/**
 * @exportedAs angular2/view
 */
export declare class ComponentRef {
    location: ElementRef;
    instance: any;
    dispose: Function;
    constructor(location: ElementRef, instance: any, dispose: Function);
    hostView: ViewRef;
}
/**
 * Service for dynamically loading a Component into an arbitrary position in the internal Angular
 * application tree.
 *
 * @exportedAs angular2/view
 */
export declare class DynamicComponentLoader {
    private _compiler;
    private _viewManager;
    constructor(compiler: Compiler, viewManager: AppViewManager);
    /**
     * Loads a component into the location given by the provided ElementRef. The loaded component
     * receives injection as if it in the place of the provided ElementRef.
     */
    loadIntoExistingLocation(typeOrBinding: any, location: ElementRef, injector?: Injector): Promise<ComponentRef>;
    /**
     * Loads a root component that is placed at the first element that matches the
     * component's selector.
     * The loaded component receives injection normally as a hosted view.
     */
    loadAsRoot(typeOrBinding: any, overrideSelector?: any, injector?: Injector): Promise<ComponentRef>;
    /**
     * Loads a component into a free host view that is not yet attached to
     * a parent on the render side, although it is attached to a parent in the injector hierarchy.
     * The loaded component receives injection normally as a hosted view.
     */
    loadIntoNewLocation(typeOrBinding: any, parentComponentLocation: ElementRef, injector?: Injector): Promise<ComponentRef>;
    /**
     * Loads a component next to the provided ElementRef. The loaded component receives
     * injection normally as a hosted view.
     */
    loadNextToExistingLocation(typeOrBinding: any, location: ElementRef, injector?: Injector): Promise<ComponentRef>;
    private _getBinding(typeOrBinding);
}
export declare var __esModule: boolean;
