import { NgZone } from 'angular2/src/core/zone/ng_zone';
export declare class EventManager {
    _plugins: List<EventManagerPlugin>;
    _zone: NgZone;
    constructor(plugins: List<EventManagerPlugin>, zone: NgZone);
    addEventListener(element: any, eventName: string, handler: Function): void;
    addGlobalEventListener(target: string, eventName: string, handler: Function): Function;
    getZone(): NgZone;
    _findPluginFor(eventName: string): EventManagerPlugin;
    _removeBubbleSymbol(eventName: string): string;
}
export declare class EventManagerPlugin {
    manager: EventManager;
    supports(eventName: string): boolean;
    addEventListener(element: any, eventName: string, handler: Function, shouldSupportBubble: boolean): void;
    addGlobalEventListener(element: any, eventName: string, handler: Function, shouldSupportBubble: boolean): Function;
}
export declare class DomEventsPlugin extends EventManagerPlugin {
    manager: EventManager;
    supports(eventName: string): boolean;
    addEventListener(element: any, eventName: string, handler: Function, shouldSupportBubble: boolean): void;
    addGlobalEventListener(target: string, eventName: string, handler: Function, shouldSupportBubble: boolean): Function;
    _getOutsideHandler(shouldSupportBubble: boolean, element: any, handler: Function, zone: NgZone): (event: any) => any;
    static sameElementCallback(element: any, handler: any, zone: any): (event: any) => void;
    static bubbleCallback(element: any, handler: any, zone: any): (event: any) => any;
}
export declare var __esModule: boolean;
