import { EventManagerPlugin } from './event_manager';
export declare class KeyEventsPlugin extends EventManagerPlugin {
    constructor();
    supports(eventName: string): boolean;
    addEventListener(element: any, eventName: string, handler: Function, shouldSupportBubble: boolean): void;
    static parseEventName(eventName: string): {
        'domEventName': any;
        'fullKey': string;
    };
    static getEventFullKey(event: any): string;
    static eventCallback(element: any, shouldSupportBubble: any, fullKey: any, handler: any, zone: any): (event: any) => void;
    static _normalizeKey(keyName: string): string;
}
