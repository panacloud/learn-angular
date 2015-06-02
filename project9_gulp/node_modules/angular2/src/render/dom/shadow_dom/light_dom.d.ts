import * as viewModule from '../view/view';
import { Content } from './content_tag';
export declare class DestinationLightDom {
}
export declare class LightDom {
    lightDomView: viewModule.DomView;
    shadowDomView: viewModule.DomView;
    nodes: List<any>;
    private _roots;
    constructor(lightDomView: viewModule.DomView, element: any);
    attachShadowDomView(shadowDomView: viewModule.DomView): void;
    detachShadowDomView(): void;
    redistribute(): void;
    contentTags(): List<Content>;
    private _collectAllContentTags(view, acc);
    expandedDomNodes(): List<any>;
    private _findRoots();
}
export declare var __esModule: boolean;
