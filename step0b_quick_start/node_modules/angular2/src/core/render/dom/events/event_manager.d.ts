import { NgZone } from 'angular2/src/core/zone/ng_zone';
import { OpaqueToken } from 'angular2/src/core/di';
export declare const EVENT_MANAGER_PLUGINS: OpaqueToken;
export declare class EventManager {
    private _zone;
    private _plugins;
    constructor(plugins: EventManagerPlugin[], _zone: NgZone);
    addEventListener(element: HTMLElement, eventName: string, handler: Function): void;
    addGlobalEventListener(target: string, eventName: string, handler: Function): Function;
    getZone(): NgZone;
}
export declare class EventManagerPlugin {
    manager: EventManager;
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): void;
    addGlobalEventListener(element: string, eventName: string, handler: Function): Function;
}
export declare class DomEventsPlugin extends EventManagerPlugin {
    manager: EventManager;
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): void;
    addGlobalEventListener(target: string, eventName: string, handler: Function): Function;
}
