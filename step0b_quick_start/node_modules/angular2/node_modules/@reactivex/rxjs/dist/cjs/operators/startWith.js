'use strict';

exports.__esModule = true;
exports['default'] = startWith;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observablesArrayObservable = require('../observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _observablesScalarObservable = require('../observables/ScalarObservable');

var _observablesScalarObservable2 = _interopRequireDefault(_observablesScalarObservable);

var _observablesEmptyObservable = require('../observables/EmptyObservable');

var _observablesEmptyObservable2 = _interopRequireDefault(_observablesEmptyObservable);

var _concatStatic = require('./concat-static');

var _concatStatic2 = _interopRequireDefault(_concatStatic);

function startWith() {
    for (var _len = arguments.length, array = Array(_len), _key = 0; _key < _len; _key++) {
        array[_key] = arguments[_key];
    }

    var scheduler = array[array.length - 1];
    if (scheduler && typeof scheduler.schedule === 'function') {
        array.pop();
    } else {
        scheduler = void 0;
    }
    var len = array.length;
    if (len === 1) {
        return _concatStatic2['default'](new _observablesScalarObservable2['default'](array[0], scheduler), this);
    } else if (len > 1) {
        return _concatStatic2['default'](new _observablesArrayObservable2['default'](array, scheduler), this);
    } else {
        return _concatStatic2['default'](new _observablesEmptyObservable2['default'](scheduler), this);
    }
}

module.exports = exports['default'];