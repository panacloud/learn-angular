import * as viewModule from '../view/view';
import { LightDom } from './light_dom';
export declare class ShadowDomStrategy {
    hasNativeContentElement(): boolean;
    /**
     * Prepares and returns the shadow root for the given element.
     */
    prepareShadowRoot(el: any): any;
    constructLightDom(lightDomView: viewModule.DomView, el: any): LightDom;
    /**
     * An optional step that can modify the template style elements.
     */
    processStyleElement(hostComponentId: string, templateUrl: string, styleElement: any): Promise<any>;
    /**
     * An optional step that can modify the template elements (style elements exlcuded).
     */
    processElement(hostComponentId: string, elementComponentId: string, element: any): void;
}
