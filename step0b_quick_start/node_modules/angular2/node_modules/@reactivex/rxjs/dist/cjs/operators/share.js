'use strict';

exports.__esModule = true;
exports['default'] = share;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _publish = require('./publish');

var _publish2 = _interopRequireDefault(_publish);

function share() {
    return _publish2['default'].call(this).refCount();
}

;
module.exports = exports['default'];