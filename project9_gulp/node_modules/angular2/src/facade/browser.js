/**
 * JS version of browser APIs. This library can only run in the browser.
 */
var win = window;
exports.window = win;
exports.document = window.document;
exports.location = window.location;
exports.gc = window['gc'] ? function () { return window['gc'](); } : function () { return null; };
exports.Event = exports.Event;
exports.MouseEvent = exports.MouseEvent;
exports.KeyboardEvent = exports.KeyboardEvent;
exports.__esModule = true;
//# sourceMappingURL=browser.js.map