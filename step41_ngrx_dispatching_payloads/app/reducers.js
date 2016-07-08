"use strict";
exports.SECOND = 'SECOND';
exports.HOUR = 'HOUR';
exports.clockReducer = function (state, action) {
    if (state === void 0) { state = new Date(); }
    var date = new Date(state.getTime());
    switch (action.type) {
        case exports.SECOND:
            date.setSeconds(date.getSeconds() + action.payload);
            return date;
        case exports.HOUR:
            date.setHours(date.getHours() + action.payload);
            return date;
        default:
            return state;
    }
};
//# sourceMappingURL=reducers.js.map