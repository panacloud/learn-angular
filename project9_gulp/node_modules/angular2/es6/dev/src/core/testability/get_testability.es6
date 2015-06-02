import { global } from 'angular2/src/facade/lang';
class PublicTestability {
    constructor(testability) {
        this._testability = testability;
    }
    whenStable(callback) { this._testability.whenStable(callback); }
    findBindings(using, binding, exactMatch) {
        return this._testability.findBindings(using, binding, exactMatch);
    }
}
export class GetTestability {
    static addToWindow(registry) {
        global.getAngularTestability = function (elem) {
            var testability = registry.findTestabilityInTree(elem);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return new PublicTestability(testability);
        };
    }
}
//# sourceMappingURL=get_testability.js.map