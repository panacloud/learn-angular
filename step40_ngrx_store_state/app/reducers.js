"use strict";
exports.SECOND = 'SECOND';
exports.HOUR = 'HOUR';
exports.clockReducer = function (state, action) {
    if (state === void 0) { state = new Date(); }
    var date = new Date(state.getTime());
    switch (action.type) {
        case exports.SECOND:
            date.setSeconds(date.getSeconds() + 1);
            return date;
        case exports.HOUR:
            date.setHours(date.getHours() + 1);
            return date;
        default:
            return state;
    }
};
//# sourceMappingURL=reducers.js.map