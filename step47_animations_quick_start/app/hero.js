"use strict";
var Hero = (function () {
    function Hero(id, name, state) {
        this.id = id;
        this.name = name;
        this.state = state;
    }
    Hero.prototype.toogleState = function () {
        if (this.state === "active") {
            this.state = 'inactive';
        }
        else {
            this.state = "active";
        }
    };
    return Hero;
}());
exports.Hero = Hero;
//# sourceMappingURL=hero.js.map