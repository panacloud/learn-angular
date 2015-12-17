/// <reference path="../../tsd.d.ts" />
import { OnInit, ElementRef, DynamicComponentLoader, NgModel, Renderer } from 'angular2/angular2';
export declare class DatePickerPopup implements OnInit {
    cd: NgModel;
    element: ElementRef;
    renderer: Renderer;
    loader: DynamicComponentLoader;
    private _activeDate;
    private placement;
    private _isOpen;
    private popup;
    constructor(cd: NgModel, element: ElementRef, renderer: Renderer, loader: DynamicComponentLoader);
    activeDate: Date;
    private isOpen;
    onInit(): void;
    private show(cb);
    hide(cb: Function): void;
}
