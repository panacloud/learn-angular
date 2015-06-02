var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var proto_record_1 = require('./proto_record');
/**
 * Removes "duplicate" records. It assuming that record evaluation does not
 * have side-effects.
 *
 * Records that are not last in bindings are removed and all the indices
 * of the records that depend on them are updated.
 *
 * Records that are last in bindings CANNOT be removed, and instead are
 * replaced with very cheap SELF records.
 */
function coalesce(records) {
    var res = collection_1.ListWrapper.create();
    var indexMap = collection_1.MapWrapper.create();
    for (var i = 0; i < records.length; ++i) {
        var r = records[i];
        var record = _replaceIndices(r, res.length + 1, indexMap);
        var matchingRecord = _findMatching(record, res);
        if (lang_1.isPresent(matchingRecord) && record.lastInBinding) {
            collection_1.ListWrapper.push(res, _selfRecord(record, matchingRecord.selfIndex, res.length + 1));
            collection_1.MapWrapper.set(indexMap, r.selfIndex, matchingRecord.selfIndex);
        }
        else if (lang_1.isPresent(matchingRecord) && !record.lastInBinding) {
            collection_1.MapWrapper.set(indexMap, r.selfIndex, matchingRecord.selfIndex);
        }
        else {
            collection_1.ListWrapper.push(res, record);
            collection_1.MapWrapper.set(indexMap, r.selfIndex, record.selfIndex);
        }
    }
    return res;
}
exports.coalesce = coalesce;
function _selfRecord(r, contextIndex, selfIndex) {
    return new proto_record_1.ProtoRecord(proto_record_1.RECORD_TYPE_SELF, "self", null, [], r.fixedArgs, contextIndex, r.directiveIndex, selfIndex, r.bindingRecord, r.expressionAsString, r.lastInBinding, r.lastInDirective);
}
function _findMatching(r, rs) {
    return collection_1.ListWrapper.find(rs, function (rr) { return rr.mode === r.mode && rr.funcOrValue === r.funcOrValue &&
        rr.contextIndex === r.contextIndex &&
        collection_1.ListWrapper.equals(rr.args, r.args); });
}
function _replaceIndices(r, selfIndex, indexMap) {
    var args = collection_1.ListWrapper.map(r.args, function (a) { return _map(indexMap, a); });
    var contextIndex = _map(indexMap, r.contextIndex);
    return new proto_record_1.ProtoRecord(r.mode, r.name, r.funcOrValue, args, r.fixedArgs, contextIndex, r.directiveIndex, selfIndex, r.bindingRecord, r.expressionAsString, r.lastInBinding, r.lastInDirective);
}
function _map(indexMap, value) {
    var r = collection_1.MapWrapper.get(indexMap, value);
    return lang_1.isPresent(r) ? r : value;
}
exports.__esModule = true;
//# sourceMappingURL=coalesce.js.map