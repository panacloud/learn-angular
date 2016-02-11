System.register(['angular2/platform/browser', './app.component', 'rxjs/Observable'], function(exports_1) {
    var browser_1, app_component_1, Observable_1;
    var button, clicks;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent);
            button = document.getElementById('button');
            clicks = Observable_1.Observable.fromEvent(button, "click");
            clicks.subscribe(function (x) { return alert("clicked"); }, function (err) { return alert("error"); }, function () { return alert('Completed'); });
        }
    }
});
//# sourceMappingURL=main.js.map