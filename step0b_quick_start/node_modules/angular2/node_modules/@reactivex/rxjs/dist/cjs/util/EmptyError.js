'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EmptyError = function EmptyError() {
    _classCallCheck(this, EmptyError);

    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
};

exports['default'] = EmptyError;
module.exports = exports['default'];