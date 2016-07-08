"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var forms_1 = require('@angular/forms');
var store_1 = require('@ngrx/store');
var app_component_1 = require('./app.component');
var reducers_1 = require('./reducers');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    store_1.provideStore({ clock: reducers_1.clockReducer })
]);
//# sourceMappingURL=main.js.map