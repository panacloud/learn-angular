import { DirectiveMetadata } from 'angular2/src/render/api';
/**
 * Converts a [DirectiveMetadata] to a map representation. This creates a copy,
 * that is, subsequent changes to `meta` will not be mirrored in the map.
 */
export declare function directiveMetadataToMap(meta: DirectiveMetadata): Map<string, any>;
/**
 * Converts a map representation of [DirectiveMetadata] into a
 * [DirectiveMetadata] object. This creates a copy, that is, subsequent changes
 * to `map` will not be mirrored in the [DirectiveMetadata] object.
 */
export declare function directiveMetadataFromMap(map: Map<string, any>): DirectiveMetadata;
