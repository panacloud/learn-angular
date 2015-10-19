'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _OuterSubscriber3 = _interopRequireDefault(_OuterSubscriber2);

var _utilSubscribeToResult = require('../util/subscribeToResult');

var _utilSubscribeToResult2 = _interopRequireDefault(_utilSubscribeToResult);

var CombineLatestOperator = (function () {
    function CombineLatestOperator(project) {
        _classCallCheck(this, CombineLatestOperator);

        this.project = project;
    }

    CombineLatestOperator.prototype.call = function call(subscriber) {
        return new CombineLatestSubscriber(subscriber, this.project);
    };

    return CombineLatestOperator;
})();

exports.CombineLatestOperator = CombineLatestOperator;

var CombineLatestSubscriber = (function (_OuterSubscriber) {
    _inherits(CombineLatestSubscriber, _OuterSubscriber);

    function CombineLatestSubscriber(destination, project) {
        _classCallCheck(this, CombineLatestSubscriber);

        _OuterSubscriber.call(this, destination);
        this.project = project;
        this.active = 0;
        this.values = [];
        this.observables = [];
        this.toRespond = [];
    }

    CombineLatestSubscriber.prototype._next = function _next(observable) {
        var toRespond = this.toRespond;
        toRespond.push(toRespond.length);
        this.observables.push(observable);
    };

    CombineLatestSubscriber.prototype._complete = function _complete() {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        } else {
            this.active = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(_utilSubscribeToResult2['default'](this, observable, observable, i));
            }
        }
    };

    CombineLatestSubscriber.prototype.notifyComplete = function notifyComplete(innerSubscriber) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };

    CombineLatestSubscriber.prototype.notifyNext = function notifyNext(observable, value, outerIndex, innerIndex) {
        var values = this.values;
        values[outerIndex] = value;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
            var found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
        if (toRespond.length === 0) {
            var project = this.project;
            var destination = this.destination;
            if (project) {
                var result = _utilTryCatch2['default'](project).apply(this, values);
                if (result === _utilErrorObject.errorObject) {
                    destination.error(_utilErrorObject.errorObject.e);
                } else {
                    destination.next(result);
                }
            } else {
                destination.next(values);
            }
        }
    };

    return CombineLatestSubscriber;
})(_OuterSubscriber3['default']);

exports.CombineLatestSubscriber = CombineLatestSubscriber;