"use strict";
var router_1 = require('@angular/router');
var page1_component_1 = require('./page1.component');
var page2_component_1 = require('./page2.component');
var admin_component_1 = require('./admin.component');
var auth_guard_1 = require('./auth.guard');
exports.routes = [
    {
        path: 'page1',
        component: page1_component_1.Page1Component
    },
    {
        path: 'page2',
        component: page2_component_1.Page2Component
    },
    {
        path: 'admin',
        component: admin_component_1.AdminComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    { path: '',
        component: page1_component_1.Page1Component
    }
];
exports.AUTH_PROVIDERS = [auth_guard_1.AuthGuard];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes),
    exports.AUTH_PROVIDERS
];
//# sourceMappingURL=app.routes.js.map