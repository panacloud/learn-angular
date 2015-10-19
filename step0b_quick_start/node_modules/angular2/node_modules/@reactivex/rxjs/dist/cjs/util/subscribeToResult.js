'use strict';

exports.__esModule = true;
exports['default'] = subscribeToResult;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Observable = require('../Observable');

var _Observable2 = _interopRequireDefault(_Observable);

var _utilSymbol_iterator = require('../util/Symbol_iterator');

var _utilSymbol_iterator2 = _interopRequireDefault(_utilSymbol_iterator);

var _utilSymbol_observable = require('../util/Symbol_observable');

var _utilSymbol_observable2 = _interopRequireDefault(_utilSymbol_observable);

var _InnerSubscriber = require('../InnerSubscriber');

var _InnerSubscriber2 = _interopRequireDefault(_InnerSubscriber);

var isArray = Array.isArray;

function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new _InnerSubscriber2['default'](outerSubscriber, outerValue, outerIndex);
    if (destination.isUnsubscribed) {
        return;
    }
    if (result instanceof _Observable2['default']) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return;
        } else {
            return result.subscribe(destination);
        }
    }
    if (isArray(result)) {
        for (var i = 0, len = result.length; i < len && !destination.isUnsubscribed; i++) {
            destination.next(result[i]);
        }
        if (!destination.isUnsubscribed) {
            destination.complete();
        }
    } else if (typeof result.then === 'function') {
        result.then(function (x) {
            if (!destination.isUnsubscribed) {
                destination.next(x);
                destination.complete();
            }
        }, function (err) {
            return destination.error(err);
        }).then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            setTimeout(function () {
                throw err;
            });
        });
        return destination;
    } else if (typeof result[_utilSymbol_iterator2['default']] === 'function') {
        for (var _iterator = result, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var item = _ref;

            destination.next(item);
            if (destination.isUnsubscribed) {
                break;
            }
        }
        if (!destination.isUnsubscribed) {
            destination.complete();
        }
    } else if (typeof result[_utilSymbol_observable2['default']] === 'function') {
        var obs = result[_utilSymbol_observable2['default']]();
        if (typeof obs.subscribe !== 'function') {
            destination.error('invalid observable');
        } else {
            return obs.subscribe(new _InnerSubscriber2['default'](outerSubscriber, outerValue, outerIndex));
        }
    } else {
        destination.error(new TypeError('unknown type returned'));
    }
}

module.exports = exports['default'];