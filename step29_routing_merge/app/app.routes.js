"use strict";
var router_1 = require('@angular/router');
var page1_component_1 = require('./page1.component');
var page2_routes_1 = require('./page2/page2.routes');
exports.routes = page2_routes_1.Page2Routes.concat([
    //Using ES6 spread operator (...).
    {
        path: 'page1',
        component: page1_component_1.Page1Component
    },
    { path: '',
        component: page1_component_1.Page1Component
    }
]);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map