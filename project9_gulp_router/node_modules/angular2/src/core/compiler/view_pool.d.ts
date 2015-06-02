import * as viewModule from './view';
export declare const APP_VIEW_POOL_CAPACITY: string;
export declare class AppViewPool {
    _poolCapacityPerProtoView: number;
    _pooledViewsPerProtoView: Map<viewModule.AppProtoView, List<viewModule.AppView>>;
    constructor(poolCapacityPerProtoView: any);
    getView(protoView: viewModule.AppProtoView): viewModule.AppView;
    returnView(view: viewModule.AppView): void;
}
export declare var __esModule: boolean;
