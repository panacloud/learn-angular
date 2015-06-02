import * as ldModule from './light_dom';
export declare class Content {
    select: string;
    private _strategy;
    contentStartElement: any;
    constructor(contentStartEl: any, selector: string);
    init(destinationLightDom: ldModule.LightDom): void;
    nodes(): List<any>;
    insert(nodes: List<any>): void;
}
export declare var __esModule: boolean;
