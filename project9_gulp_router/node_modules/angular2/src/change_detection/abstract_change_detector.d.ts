import { ChangeDetectorRef } from './change_detector_ref';
import { ChangeDetector } from './interfaces';
export declare class AbstractChangeDetector extends ChangeDetector {
    lightDomChildren: List<any>;
    shadowDomChildren: List<any>;
    parent: ChangeDetector;
    mode: string;
    ref: ChangeDetectorRef;
    constructor();
    addChild(cd: ChangeDetector): void;
    removeChild(cd: ChangeDetector): void;
    addShadowDomChild(cd: ChangeDetector): void;
    removeShadowDomChild(cd: ChangeDetector): void;
    remove(): void;
    detectChanges(): void;
    checkNoChanges(): void;
    _detectChanges(throwOnChange: boolean): void;
    detectChangesInRecords(throwOnChange: boolean): void;
    callOnAllChangesDone(): void;
    _detectChangesInLightDomChildren(throwOnChange: boolean): void;
    _detectChangesInShadowDomChildren(throwOnChange: boolean): void;
    markAsCheckOnce(): void;
    markPathToRootAsCheckOnce(): void;
}
export declare var __esModule: boolean;
