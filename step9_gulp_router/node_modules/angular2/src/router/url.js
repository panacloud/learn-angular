var lang_1 = require('angular2/src/facade/lang');
var specialCharacters = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
var escapeRe = lang_1.RegExpWrapper.create('(\\' + specialCharacters.join('|\\') + ')', 'g');
function escapeRegex(string) {
    return lang_1.StringWrapper.replaceAllMapped(string, escapeRe, function (match) { return "\\" + match; });
}
exports.escapeRegex = escapeRegex;
exports.__esModule = true;
//# sourceMappingURL=url.js.map