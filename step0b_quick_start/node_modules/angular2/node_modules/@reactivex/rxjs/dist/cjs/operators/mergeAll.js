'use strict';

exports.__esModule = true;
exports['default'] = mergeAll;

var _mergeAllSupport = require('./mergeAll-support');

function mergeAll() {
    var concurrent = arguments.length <= 0 || arguments[0] === undefined ? Number.POSITIVE_INFINITY : arguments[0];

    return this.lift(new _mergeAllSupport.MergeAllOperator(concurrent));
}

module.exports = exports['default'];