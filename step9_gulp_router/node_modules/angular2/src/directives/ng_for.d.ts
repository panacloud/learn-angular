import { ViewContainerRef, ProtoViewRef } from 'angular2/core';
/**
 * The `NgFor` directive instantiates a template once per item from an iterable. The context for
 * each instantiated template inherits from the outer context with the given loop variable set
 * to the current item from the iterable.
 *
 * It is possible to alias the `index` to a local variable that will be set to the current loop
 * iteration in the template context.
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
 * - `<template [ng-for] #item [ng-for-of]="items" #i="index"><li>...</li></template>`
 *
 * @exportedAs angular2/directives
 */
export declare class NgFor {
    viewContainer: ViewContainerRef;
    protoViewRef: ProtoViewRef;
    constructor(viewContainer: ViewContainerRef, protoViewRef: ProtoViewRef);
    iterableChanges: any;
    perViewChange(view: any, record: any): void;
    static bulkRemove(tuples: any, viewContainer: any): any[];
    static bulkInsert(tuples: any, viewContainer: any, protoViewRef: any): any;
}
export declare var __esModule: boolean;
