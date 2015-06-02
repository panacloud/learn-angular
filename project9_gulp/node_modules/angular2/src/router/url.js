"use strict";
Object.defineProperties(module.exports, {
  escapeRegex: {get: function() {
      return escapeRegex;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_facade_47_lang__;
var $__0 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    RegExpWrapper = $__0.RegExpWrapper,
    StringWrapper = $__0.StringWrapper;
var specialCharacters = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
var escapeRe = RegExpWrapper.create('(\\' + specialCharacters.join('|\\') + ')', 'g');
function escapeRegex(string) {
  return StringWrapper.replaceAllMapped(string, escapeRe, (function(match) {
    return "\\" + match;
  }));
}
Object.defineProperty(escapeRegex, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
//# sourceMappingURL=url.js.map

//# sourceMappingURL=./url.map