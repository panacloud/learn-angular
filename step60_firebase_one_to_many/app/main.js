"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var angularfire2_1 = require('angularfire2');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    angularfire2_1.FIREBASE_PROVIDERS,
    // Initialize Firebase app  
    angularfire2_1.defaultFirebase({
        apiKey: "AIzaSyBfPPVdQLUnAq2yJC3yEg2rEdclksJdxvA",
        authDomain: "quickstart-db.firebaseapp.com",
        databaseURL: "https://quickstart-db.firebaseio.com",
        storageBucket: "quickstart-db.appspot.com",
    })
]);
//# sourceMappingURL=main.js.map