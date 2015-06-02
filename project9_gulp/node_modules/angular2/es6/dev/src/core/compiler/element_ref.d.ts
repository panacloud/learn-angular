import { ViewRef } from './view_ref';
/**
 * @exportedAs angular2/view
 */
export declare class ElementRef {
    parentView: ViewRef;
    boundElementIndex: number;
    constructor(parentView: ViewRef, boundElementIndex: number);
    /**
     * Exposes the underlying DOM element.
     * (DEPRECATED way of accessing the DOM, replacement coming)
     */
    domElement: any;
    /**
     * Gets an attribute from the underlying DOM element.
     * (DEPRECATED way of accessing the DOM, replacement coming)
     */
    getAttribute(name: string): string;
}
