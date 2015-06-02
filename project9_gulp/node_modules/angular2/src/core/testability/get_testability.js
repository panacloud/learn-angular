var lang_1 = require('angular2/src/facade/lang');
var PublicTestability = (function () {
    function PublicTestability(testability) {
        this._testability = testability;
    }
    PublicTestability.prototype.whenStable = function (callback) { this._testability.whenStable(callback); };
    PublicTestability.prototype.findBindings = function (using, binding, exactMatch) {
        return this._testability.findBindings(using, binding, exactMatch);
    };
    return PublicTestability;
})();
var GetTestability = (function () {
    function GetTestability() {
    }
    GetTestability.addToWindow = function (registry) {
        lang_1.global.getAngularTestability = function (elem) {
            var testability = registry.findTestabilityInTree(elem);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return new PublicTestability(testability);
        };
    };
    return GetTestability;
})();
exports.GetTestability = GetTestability;
exports.__esModule = true;
//# sourceMappingURL=get_testability.js.map