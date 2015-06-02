import { XHR } from 'angular2/src/services/xhr';
import { ViewDefinition } from '../../api';
import { UrlResolver } from 'angular2/src/services/url_resolver';
/**
 * Strategy to load component templates.
 * TODO: Make public API once we are more confident in this approach.
 */
export declare class TemplateLoader {
    _xhr: XHR;
    _htmlCache: StringMap<string, any>;
    constructor(xhr: XHR, urlResolver: UrlResolver);
    load(template: ViewDefinition): Promise<any>;
}
export declare var __esModule: boolean;
