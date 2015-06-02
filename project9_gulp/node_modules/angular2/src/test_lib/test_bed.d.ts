import { Injector } from 'angular2/di';
import { Type } from 'angular2/src/facade/lang';
import { View } from 'angular2/src/core/annotations_impl/view';
import { AppView } from 'angular2/src/core/compiler/view';
import { ComponentRef } from 'angular2/src/core/compiler/dynamic_component_loader';
/**
 * @exportedAs angular2/test
 */
export declare class TestBed {
    _injector: Injector;
    constructor(injector: Injector);
    /**
     * Overrides the {@link View} of a {@link Component}.
     *
     * @see setInlineTemplate() to only override the html
     *
     * @param {Type} component
     * @param {ViewDefinition} template
     */
    overrideView(component: Type, template: View): void;
    /**
     * Overrides only the html of a {@link Component}.
     * All the other propoerties of the component's {@link View} are preserved.
     *
     * @param {Type} component
     * @param {string} html
     */
    setInlineTemplate(component: Type, html: string): void;
    /**
     * Overrides the directives from the component {@link View}.
     *
     * @param {Type} component
     * @param {Type} from
     * @param {Type} to
     */
    overrideDirective(component: Type, from: Type, to: Type): void;
    /**
     * Creates an `AppView` for the given component.
     *
     * Only either a component or a context needs to be specified but both can be provided for
     * advanced use cases (ie subclassing the context).
     *
     * @param {Type} component
     * @param {*} context
     * @param {string} html Use as the component template when specified (shortcut for
     * setInlineTemplate)
     * @return {Promise<ViewProxy>}
     */
    createView(component: Type, {context, html}?: {
        context?: any;
        html?: string;
    }): Promise<ViewProxy>;
}
/**
 * Proxy to `AppView` return by `createView` in {@link TestBed} which offers a high level API for
 * tests.
 */
export declare class ViewProxy {
    _componentRef: ComponentRef;
    _view: AppView;
    constructor(componentRef: ComponentRef);
    context: any;
    rootNodes: List<any>;
    detectChanges(): void;
    querySelector(selector: any): void;
    destroy(): void;
    /**
     * @returns `AppView` returns the underlying `AppView`.
     *
     * Prefer using the other methods which hide implementation details.
     */
    rawView: AppView;
}
export declare var __esModule: boolean;
