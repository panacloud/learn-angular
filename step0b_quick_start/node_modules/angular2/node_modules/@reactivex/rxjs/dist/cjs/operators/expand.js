'use strict';

exports.__esModule = true;
exports['default'] = expand;

var _expandSupport = require('./expand-support');

function expand(project) {
    var concurrent = arguments.length <= 1 || arguments[1] === undefined ? Number.POSITIVE_INFINITY : arguments[1];

    return this.lift(new _expandSupport.ExpandOperator(project, concurrent));
}

module.exports = exports['default'];