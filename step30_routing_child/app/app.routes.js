"use strict";
var router_1 = require('@angular/router');
var page1_component_1 = require('./page1.component');
var page2_component_1 = require('./page2.component');
var section1_page2_component_1 = require('./section1.page2.component');
var section2_page2_component_1 = require('./section2.page2.component');
exports.routes = [
    {
        path: 'page1',
        component: page1_component_1.Page1Component
    },
    {
        path: 'page2',
        component: page2_component_1.Page2Component,
        children: [
            { path: 'section1', component: section1_page2_component_1.Section1Component },
            { path: 'section2', component: section2_page2_component_1.Section2Component },
            { path: '', redirectTo: 'section1', terminal: true },
        ]
    },
    { path: '',
        component: page1_component_1.Page1Component
    }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map