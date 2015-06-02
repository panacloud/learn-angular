import { ChangeDetector } from './interfaces';
/**
 * Controls change detection.
 *
 * {@link ChangeDetectorRef} allows requesting checks for detectors that rely on observables. It
 *also allows detaching and
 * attaching change detector subtrees.
 *
 * @exportedAs angular2/change_detection
 */
export declare class ChangeDetectorRef {
    private _cd;
    constructor(_cd: ChangeDetector);
    /**
     * Request to check all ON_PUSH ancestors.
     */
    requestCheck(): void;
    /**
     * Detaches the change detector from the change detector tree.
     *
     * The detached change detector will not be checked until it is reattached.
     */
    detach(): void;
    /**
     * Reattach the change detector to the change detector tree.
     *
     * This also requests a check of this change detector. This reattached change detector will be
     *checked during the
     * next change detection run.
     */
    reattach(): void;
}
export declare var __esModule: boolean;
