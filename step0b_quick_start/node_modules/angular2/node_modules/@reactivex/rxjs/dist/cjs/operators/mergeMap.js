'use strict';

exports.__esModule = true;
exports['default'] = mergeMap;

var _mergeMapSupport = require('./mergeMap-support');

function mergeMap(project, resultSelector) {
    var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

    return this.lift(new _mergeMapSupport.MergeMapOperator(project, resultSelector, concurrent));
}

module.exports = exports['default'];