import * as viewModule from './view';
import { RenderViewRef } from 'angular2/src/render/api';
export declare function internalView(viewRef: ViewRef): viewModule.AppView;
export declare function internalProtoView(protoViewRef: ProtoViewRef): viewModule.AppProtoView;
/**
 * @exportedAs angular2/view
 */
export declare class ViewRef {
    _view: viewModule.AppView;
    constructor(view: viewModule.AppView);
    render: RenderViewRef;
    setLocal(contextName: string, value: any): void;
}
/**
 * @exportedAs angular2/view
 */
export declare class ProtoViewRef {
    _protoView: viewModule.AppProtoView;
    constructor(protoView: any);
}
