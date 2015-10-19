'use strict';

exports.__esModule = true;
exports['default'] = shareReplay;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _publishReplay = require('./publishReplay');

var _publishReplay2 = _interopRequireDefault(_publishReplay);

function shareReplay(bufferSize, windowTime, scheduler) {
    if (bufferSize === undefined) bufferSize = Number.POSITIVE_INFINITY;
    if (windowTime === undefined) windowTime = Number.POSITIVE_INFINITY;

    return _publishReplay2['default'].call(this, bufferSize, windowTime, scheduler).refCount();
}

module.exports = exports['default'];