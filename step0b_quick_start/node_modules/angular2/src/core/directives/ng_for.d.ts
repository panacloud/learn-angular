import { DoCheck } from 'angular2/lifecycle_hooks';
import { ChangeDetectorRef, IterableDiffers } from 'angular2/src/core/change_detection';
import { ViewContainerRef, TemplateRef } from 'angular2/src/core/linker';
/**
 * The `NgFor` directive instantiates a template once per item from an iterable. The context for
 * each instantiated template inherits from the outer context with the given loop variable set
 * to the current item from the iterable.
 *
 * It is possible to alias the `index` to a local variable that will be set to the current loop
 * iteration in the template context, and also to alias the 'last' to a local variable that will
 * be set to a boolean indicating if the item is the last one in the iteration
 *
 * When the contents of the iterator changes, `NgFor` makes the corresponding changes to the DOM:
 *
 * * When an item is added, a new instance of the template is added to the DOM.
 * * When an item is removed, its template instance is removed from the DOM.
 * * When items are reordered, their respective templates are reordered in the DOM.
 *
 * # Example
 *
 * ```
 * <ul>
 *   <li *ng-for="#error of errors; #i = index">
 *     Error {{i}} of {{errors.length}}: {{error.message}}
 *   </li>
 * </ul>
 * ```
 *
 * # Syntax
 *
 * - `<li *ng-for="#item of items; #i = index">...</li>`
 * - `<li template="ng-for #item of items; #i = index">...</li>`
 * - `<template ng-for #item [ng-for-of]="items" #i="index"><li>...</li></template>`
 */
export declare class NgFor implements DoCheck {
    private _viewContainer;
    private _templateRef;
    private _iterableDiffers;
    private _cdr;
    private _differ;
    constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef, _iterableDiffers: IterableDiffers, _cdr: ChangeDetectorRef);
    ngForOf: any;
    ngForTemplate: TemplateRef;
    doCheck(): void;
    private _applyChanges(changes);
    private _perViewChange(view, record);
    private _bulkRemove(tuples);
    private _bulkInsert(tuples);
}
