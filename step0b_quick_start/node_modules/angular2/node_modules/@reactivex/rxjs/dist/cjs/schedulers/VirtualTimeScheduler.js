'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscription2 = require('../Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

var VirtualTimeScheduler = (function () {
    function VirtualTimeScheduler() {
        _classCallCheck(this, VirtualTimeScheduler);

        this.actions = [];
        this.active = false;
        this.scheduled = false;
        this.index = 0;
        this.sorted = false;
        this.frame = 0;
        this.maxFrames = 750;
    }

    VirtualTimeScheduler.prototype.now = function now() {
        return this.frame;
    };

    VirtualTimeScheduler.prototype.flush = function flush() {
        var actions = this.actions;
        var maxFrames = this.maxFrames;
        while (actions.length > 0) {
            var action = actions.shift();
            this.frame = action.delay;
            if (this.frame <= maxFrames) {
                action.execute();
            } else {
                break;
            }
        }
        actions.length = 0;
        this.frame = 0;
    };

    VirtualTimeScheduler.prototype.addAction = function addAction(action) {
        var findDelay = action.delay;
        var actions = this.actions;
        var len = actions.length;
        var vaction = action;
        actions.push(action);
        actions.sort(function (a, b) {
            if (a.delay === b.delay) {
                if (a.index === b.index) {
                    return 0;
                } else if (a.index > b.index) {
                    return 1;
                } else {
                    return -1;
                }
            } else if (a.delay > b.delay) {
                return 1;
            } else {
                return -1;
            }
        });
    };

    VirtualTimeScheduler.prototype.schedule = function schedule(work, delay, state) {
        if (delay === undefined) delay = 0;

        this.sorted = false;
        return new VirtualAction(this, work, this.index++).schedule(state, delay);
    };

    return VirtualTimeScheduler;
})();

exports['default'] = VirtualTimeScheduler;

VirtualTimeScheduler.frameTimeFactor = 10;

var VirtualAction = (function (_Subscription) {
    _inherits(VirtualAction, _Subscription);

    function VirtualAction(scheduler, work, index) {
        _classCallCheck(this, VirtualAction);

        _Subscription.call(this);
        this.scheduler = scheduler;
        this.work = work;
        this.index = index;
        this.calls = 0;
    }

    VirtualAction.prototype.schedule = function schedule(state) {
        var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        if (this.isUnsubscribed) {
            return this;
        }
        var scheduler = this.scheduler;
        var action = undefined;
        if (this.calls++ === 0) {
            // the action is not being rescheduled.
            action = this;
        } else {
            // the action is being rescheduled, and we can't mutate the one in the actions list
            // in the scheduler, so we'll create a new one.
            action = new VirtualAction(scheduler, this.work, scheduler.index += 1);
            this.add(action);
        }
        action.state = state;
        action.delay = scheduler.frame + delay;
        scheduler.addAction(action);
        return this;
    };

    VirtualAction.prototype.execute = function execute() {
        if (this.isUnsubscribed) {
            throw new Error('How did did we execute a canceled Action?');
        }
        this.work(this.state);
    };

    VirtualAction.prototype.unsubscribe = function unsubscribe() {
        var actions = this.scheduler.actions;
        var index = actions.indexOf(this);
        this.work = void 0;
        this.state = void 0;
        this.scheduler = void 0;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        _Subscription.prototype.unsubscribe.call(this);
    };

    return VirtualAction;
})(_Subscription3['default']);

module.exports = exports['default'];