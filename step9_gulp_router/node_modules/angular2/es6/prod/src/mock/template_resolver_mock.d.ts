import { Type } from 'angular2/src/facade/lang';
import { View } from 'angular2/src/core/annotations_impl/view';
import { TemplateResolver } from 'angular2/src/core/compiler/template_resolver';
export declare class MockTemplateResolver extends TemplateResolver {
    _views: Map<Type, View>;
    _inlineTemplates: Map<Type, string>;
    _viewCache: Map<Type, View>;
    _directiveOverrides: Map<Type, Map<Type, Type>>;
    constructor();
    /**
     * Overrides the {@link View} for a component.
     *
     * @param {Type} component
     * @param {ViewDefinition} view
     */
    setView(component: Type, view: View): void;
    /**
     * Overrides the inline template for a component - other configuration remains unchanged.
     *
     * @param {Type} component
     * @param {string} template
     */
    setInlineTemplate(component: Type, template: string): void;
    /**
     * Overrides a directive from the component {@link View}.
     *
     * @param {Type} component
     * @param {Type} from
     * @param {Type} to
     */
    overrideViewDirective(component: Type, from: Type, to: Type): void;
    /**
     * Returns the {@link View} for a component:
     * - Set the {@link View} to the overridden view when it exists or fallback to the default
     * `TemplateResolver`,
     *   see `setView`.
     * - Override the directives, see `overrideViewDirective`.
     * - Override the @View definition, see `setInlineTemplate`.
     *
     * @param component
     * @returns {ViewDefinition}
     */
    resolve(component: Type): View;
    /**
     * Once a component has been compiled, the AppProtoView is stored in the compiler cache.
     *
     * Then it should not be possible to override the component configuration after the component
     * has been compiled.
     *
     * @param {Type} component
     */
    _checkOverrideable(component: Type): void;
}
