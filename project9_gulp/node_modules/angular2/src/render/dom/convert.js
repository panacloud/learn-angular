var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var api_1 = require('angular2/src/render/api');
/**
 * Converts a [DirectiveMetadata] to a map representation. This creates a copy,
 * that is, subsequent changes to `meta` will not be mirrored in the map.
 */
function directiveMetadataToMap(meta) {
    return collection_1.MapWrapper.createFromPairs([
        ['id', meta.id],
        ['selector', meta.selector],
        ['compileChildren', meta.compileChildren],
        ['hostListeners', _cloneIfPresent(meta.hostListeners)],
        ['hostProperties', _cloneIfPresent(meta.hostProperties)],
        ['hostAttributes', _cloneIfPresent(meta.hostAttributes)],
        ['hostActions', _cloneIfPresent(meta.hostActions)],
        ['properties', _cloneIfPresent(meta.properties)],
        ['readAttributes', _cloneIfPresent(meta.readAttributes)],
        ['type', meta.type],
        ['version', 1]
    ]);
}
exports.directiveMetadataToMap = directiveMetadataToMap;
/**
 * Converts a map representation of [DirectiveMetadata] into a
 * [DirectiveMetadata] object. This creates a copy, that is, subsequent changes
 * to `map` will not be mirrored in the [DirectiveMetadata] object.
 */
function directiveMetadataFromMap(map) {
    return new api_1.DirectiveMetadata({
        id: collection_1.MapWrapper.get(map, 'id'),
        selector: collection_1.MapWrapper.get(map, 'selector'),
        compileChildren: collection_1.MapWrapper.get(map, 'compileChildren'),
        hostListeners: _cloneIfPresent(collection_1.MapWrapper.get(map, 'hostListeners')),
        hostProperties: _cloneIfPresent(collection_1.MapWrapper.get(map, 'hostProperties')),
        hostActions: _cloneIfPresent(collection_1.MapWrapper.get(map, 'hostActions')),
        hostAttributes: _cloneIfPresent(collection_1.MapWrapper.get(map, 'hostAttributes')),
        properties: _cloneIfPresent(collection_1.MapWrapper.get(map, 'properties')),
        readAttributes: _cloneIfPresent(collection_1.MapWrapper.get(map, 'readAttributes')),
        type: collection_1.MapWrapper.get(map, 'type')
    });
}
exports.directiveMetadataFromMap = directiveMetadataFromMap;
/**
 * Clones the [List] or [Map] `o` if it is present.
 */
function _cloneIfPresent(o) {
    if (!lang_1.isPresent(o))
        return null;
    return collection_1.ListWrapper.isList(o) ? collection_1.ListWrapper.clone(o) : collection_1.MapWrapper.clone(o);
}
exports.__esModule = true;
//# sourceMappingURL=convert.js.map