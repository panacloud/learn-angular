var async_1 = require('angular2/src/facade/async');
/**
 * Responsible for performing each step of navigation.
 * "Steps" are conceptually similar to "middleware"
 */
var Pipeline = (function () {
    function Pipeline() {
        this.steps = [function (instruction) { return instruction.router.activateOutlets(instruction); }];
    }
    Pipeline.prototype.process = function (instruction) {
        var steps = this.steps, currentStep = 0;
        function processOne(result) {
            if (result === void 0) { result = true; }
            if (currentStep >= steps.length) {
                return async_1.PromiseWrapper.resolve(result);
            }
            var step = steps[currentStep];
            currentStep += 1;
            return async_1.PromiseWrapper.resolve(step(instruction)).then(processOne);
        }
        return processOne();
    };
    return Pipeline;
})();
exports.Pipeline = Pipeline;
exports.__esModule = true;
//# sourceMappingURL=pipeline.js.map