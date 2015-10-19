import { Provider } from './di';
import { Type } from 'angular2/src/core/facade/lang';
import { Promise } from 'angular2/src/core/facade/async';
import { ComponentRef } from './linker/dynamic_component_loader';
export { APP_COMPONENT, APP_ID } from './application_tokens';
export { platform } from './application_common';
export { PlatformRef, ApplicationRef, applicationCommonBindings, createNgZone, platformCommon, platformBindings } from './application_ref';
export declare function bootstrap(appComponentType: any, appBindings?: Array<Type | Provider | any[]>): Promise<ComponentRef>;
