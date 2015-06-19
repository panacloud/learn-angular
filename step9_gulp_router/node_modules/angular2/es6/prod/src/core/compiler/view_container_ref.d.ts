import { Injector } from 'angular2/di';
import * as avmModule from './view_manager';
import { ElementRef } from './element_ref';
import { ViewRef, ProtoViewRef } from './view_ref';
/**
 * @exportedAs angular2/core
 */
export declare class ViewContainerRef {
    viewManager: avmModule.AppViewManager;
    element: ElementRef;
    constructor(viewManager: avmModule.AppViewManager, element: ElementRef);
    private _getViews();
    clear(): void;
    get(index: number): ViewRef;
    length: number;
    create(protoViewRef?: ProtoViewRef, atIndex?: number, context?: ElementRef, injector?: Injector): ViewRef;
    insert(viewRef: ViewRef, atIndex?: number): ViewRef;
    indexOf(viewRef: ViewRef): number;
    remove(atIndex?: number): void;
    /**
     * The method can be used together with insert to implement a view move, i.e.
     * moving the dom nodes while the directives in the view stay intact.
     */
    detach(atIndex?: number): ViewRef;
}
