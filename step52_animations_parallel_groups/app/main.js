"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var forms_1 = require('@angular/forms');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms()
]);
//# sourceMappingURL=main.js.map