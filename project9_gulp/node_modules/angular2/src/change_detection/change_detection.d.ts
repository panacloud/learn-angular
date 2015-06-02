import { PipeFactory } from './pipes/pipe';
import { PipeRegistry } from './pipes/pipe_registry';
import { ChangeDetection, ProtoChangeDetector, ChangeDetectorDefinition } from './interfaces';
/**
 * Structural diffing for `Object`s and `Map`s.
 *
 * @exportedAs angular2/pipes
 */
export declare var keyValDiff: List<PipeFactory>;
/**
 * Structural diffing for `Iterable` types such as `Array`s.
 *
 * @exportedAs angular2/pipes
 */
export declare var iterableDiff: List<PipeFactory>;
/**
 * Async binding to such types as Observable.
 *
 * @exportedAs angular2/pipes
 */
export declare var async: List<PipeFactory>;
/**
 * Uppercase text transform.
 *
 * @exportedAs angular2/pipes
 */
export declare var uppercase: List<PipeFactory>;
/**
 * Lowercase text transform.
 *
 * @exportedAs angular2/pipes
 */
export declare var lowercase: List<PipeFactory>;
/**
 * Json stringify transform.
 *
 * @exportedAs angular2/pipes
 */
export declare var json: List<PipeFactory>;
export declare var defaultPipes: {
    "iterableDiff": List<PipeFactory>;
    "keyValDiff": List<PipeFactory>;
    "async": List<PipeFactory>;
    "uppercase": List<PipeFactory>;
    "lowercase": List<PipeFactory>;
    "json": List<PipeFactory>;
};
export declare var preGeneratedProtoDetectors: {};
/**
 * Implements change detection using a map of pregenerated proto detectors.
 *
 * @exportedAs angular2/change_detection
 */
export declare class PreGeneratedChangeDetection extends ChangeDetection {
    private registry;
    _dynamicChangeDetection: ChangeDetection;
    _protoChangeDetectorFactories: StringMap<string, Function>;
    constructor(registry: PipeRegistry, protoChangeDetectors?: any);
    createProtoChangeDetector(definition: ChangeDetectorDefinition): ProtoChangeDetector;
}
/**
 * Implements change detection that does not require `eval()`.
 *
 * This is slower than {@link JitChangeDetection}.
 *
 * @exportedAs angular2/change_detection
 */
export declare class DynamicChangeDetection extends ChangeDetection {
    private registry;
    constructor(registry: PipeRegistry);
    createProtoChangeDetector(definition: ChangeDetectorDefinition): ProtoChangeDetector;
}
/**
 * Implements faster change detection, by generating source code.
 *
 * This requires `eval()`. For change detection that does not require `eval()`, see {@link
 *DynamicChangeDetection}.
 *
 * @exportedAs angular2/change_detection
 */
export declare class JitChangeDetection extends ChangeDetection {
    registry: PipeRegistry;
    constructor(registry: PipeRegistry);
    createProtoChangeDetector(definition: ChangeDetectorDefinition): ProtoChangeDetector;
}
export declare var defaultPipeRegistry: PipeRegistry;
export declare var __esModule: boolean;
