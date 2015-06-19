import * as ldModule from './light_dom';
export declare class Content {
    contentStartElement: any;
    select: string;
    private _strategy;
    constructor(contentStartElement: any, select: string);
    init(destinationLightDom: ldModule.LightDom): void;
    nodes(): List<any>;
    insert(nodes: List<any>): void;
}
export declare var __esModule: boolean;
