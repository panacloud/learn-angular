"use strict";
var immutable_1 = require('immutable');
exports.SECOND = 'SECOND';
exports.HOUR = 'HOUR';
exports.clockReducer = function (state, action) {
    if (state === void 0) { state = new Date(); }
    if (action === void 0) { action = { type: "" }; }
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
var defaultPeople = immutable_1.List([
    { name: "Sara", time: exports.clockReducer(undefined, undefined) },
    { name: "John", time: exports.clockReducer(undefined, undefined) },
    { name: "Nancy", time: exports.clockReducer(undefined, undefined) },
    { name: "Drew", time: exports.clockReducer(undefined, undefined) }
]);
exports.peopleReducer = function (state, action) {
    if (state === void 0) { state = defaultPeople; }
    switch (action.type) {
        default:
            return state;
    }
};
//# sourceMappingURL=reducers.js.map