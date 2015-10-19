import { RenderViewRef, RenderEventDispatcher } from 'angular2/src/core/render/api';
import { Serializer } from 'angular2/src/web_workers/shared/serializer';
import { EventEmitter } from 'angular2/src/core/facade/async';
export declare class EventDispatcher implements RenderEventDispatcher {
    private _viewRef;
    private _sink;
    private _serializer;
    constructor(_viewRef: RenderViewRef, _sink: EventEmitter, _serializer: Serializer);
    dispatchRenderEvent(elementIndex: number, eventName: string, locals: Map<string, any>): boolean;
}
