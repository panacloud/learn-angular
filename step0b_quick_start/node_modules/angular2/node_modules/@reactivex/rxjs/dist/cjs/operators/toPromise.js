'use strict';

exports.__esModule = true;
exports['default'] = toPromise;

var _utilRoot = require('../util/root');

function toPromise(PromiseCtor) {
    var _this = this;

    if (!PromiseCtor) {
        if (_utilRoot.root.Rx && _utilRoot.root.Rx.config && _utilRoot.root.Rx.config.Promise) {
            PromiseCtor = _utilRoot.root.Rx.config.Promise;
        } else if (_utilRoot.root.Promise) {
            PromiseCtor = _utilRoot.root.Promise;
        }
    }
    if (!PromiseCtor) {
        throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function (resolve, reject) {
        var value = undefined;
        _this.subscribe(function (x) {
            return value = x;
        }, function (err) {
            return reject(err);
        }, function () {
            return resolve(value);
        });
    });
}

module.exports = exports['default'];