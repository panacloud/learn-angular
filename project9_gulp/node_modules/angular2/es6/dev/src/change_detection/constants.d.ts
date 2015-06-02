/**
 * CHECK_ONCE means that after calling detectChanges the mode of the change detector
 * will become CHECKED.
 */
export declare const CHECK_ONCE: string;
/**
 * CHECKED means that the change detector should be skipped until its mode changes to
 * CHECK_ONCE or CHECK_ALWAYS.
 */
export declare const CHECKED: string;
/**
 * CHECK_ALWAYS means that after calling detectChanges the mode of the change detector
 * will remain CHECK_ALWAYS.
 */
export declare const CHECK_ALWAYS: string;
/**
 * DETACHED means that the change detector sub tree is not a part of the main tree and
 * should be skipped.
 */
export declare const DETACHED: string;
/**
 * ON_PUSH means that the change detector's mode will be set to CHECK_ONCE during hydration.
 */
export declare const ON_PUSH: string;
/**
 * DEFAULT means that the change detector's mode will be set to CHECK_ALWAYS during hydration.
 */
export declare const DEFAULT: string;
