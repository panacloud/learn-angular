'use strict';

exports.__esModule = true;
exports['default'] = findIndex;

var _findSupport = require('./find-support');

function findIndex(predicate, thisArg) {
    return this.lift(new _findSupport.FindValueOperator(predicate, this, true, thisArg));
}

module.exports = exports['default'];