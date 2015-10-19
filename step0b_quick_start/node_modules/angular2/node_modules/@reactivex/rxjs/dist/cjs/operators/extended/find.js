'use strict';

exports.__esModule = true;
exports['default'] = find;

var _findSupport = require('./find-support');

function find(predicate, thisArg) {
    return this.lift(new _findSupport.FindValueOperator(predicate, this, false, thisArg));
}

module.exports = exports['default'];