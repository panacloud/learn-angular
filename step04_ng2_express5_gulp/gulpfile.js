/// <reference path="typings/tsd.d.ts" />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');
gulp.task('cleanServerDistDir', function () {
    return gulp.src('dist/server').pipe(rimraf());
});
gulp.task('cleanClientDistDir', function () {
    return gulp.src('dist/client').pipe(rimraf());
});
gulp.task('buildServer', ['cleanServerDistDir'], function () {
    var tsResult = gulp.src('./src/server/**/*.ts')
        .pipe(ts({
        module: 'CommonJS'
    }));
    return tsResult.js.pipe(gulp.dest('./dist/server/'));
});
gulp.task('copySystemLib', ['cleanClientDistDir'], function () {
    var clientResult = gulp.src('./node_modules/systemjs/dist/system.src.js');
    return clientResult.pipe(gulp.dest('./dist/client/lib'));
});
gulp.task('copyPolyfills', ['cleanClientDistDir'], function () {
    var clientResult = gulp.src('./node_modules/angular2/bundles/angular2-polyfills.js');
    return clientResult.pipe(gulp.dest('./dist/client/lib'));
});
gulp.task('copyRxJS', ['cleanClientDistDir'], function () {
    var clientResult = gulp.src('./node_modules/rxjs/bundles/Rx.js');
    return clientResult.pipe(gulp.dest('./dist/client/lib'));
});
gulp.task('copyAngular2Lib', ['cleanClientDistDir'], function () {
    var clientResult = gulp.src('./node_modules/angular2/bundles/angular2.dev.js');
    return clientResult.pipe(gulp.dest('./dist/client/lib'));
});
gulp.task('copyRouterLib', ['cleanClientDistDir'], function () {
    var clientResult = gulp.src('./node_modules/angular2/bundles/router.dev.js');
    return clientResult.pipe(gulp.dest('./dist/client/lib'));
});
gulp.task('copyHttpLib', ['cleanClientDistDir'], function () {
    var clientResult = gulp.src('./node_modules/angular2/bundles/http.dev.js');
    return clientResult.pipe(gulp.dest('./dist/client/lib'));
});
gulp.task('copyNG2BootstrapLib', ['cleanClientDistDir'], function () {
    var clientResult = gulp.src('./node_modules/ng2-bootstrap/ng2-bootstrap.js');
    return clientResult.pipe(gulp.dest('./dist/client/lib/ng2-bootstrap'));
});
gulp.task('copyNG2BootstrapComponents', ['cleanClientDistDir'], function () {
    var clientResult = gulp.src('./node_modules/ng2-bootstrap/components/**/*.js');
    return clientResult.pipe(gulp.dest('./dist/client/lib/ng2-bootstrap/components'));
});
gulp.task('copyClient', ['cleanClientDistDir'], function () {
    var clientResult = gulp.src(['./src/client/**/*.*', '!./src/client/**/*.ts']);
    return clientResult.pipe(gulp.dest('./dist/client/'));
});
gulp.task('buildClient', ['copyClient', 'copySystemLib', 'copyAngular2Lib', 'copyNG2BootstrapLib', 'copyNG2BootstrapComponents', 'copyPolyfills', 'copyRxJS', 'copyRouterLib', 'copyHttpLib'], function () {
    var clientResult = gulp.src('./src/client/**/*.ts')
        .pipe(ts({
        module: 'system',
        target: 'ES5',
        moduleResolution: "node",
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        removeComments: false,
        noImplicitAny: false
    }));
    return clientResult.pipe(gulp.dest('./dist/client/'));
});
gulp.task('nodemon', ['buildServer', 'buildClient', 'watchClient', 'watchServer'], function () {
    nodemon({
        script: './dist/server/server.js',
        ignore: ["test/*", "dist/client/**/*.*", "src/client/**/*.*"]
    }).on('restart', function () {
        console.log('nodemon restarted pinpoint.js');
    });
});
gulp.task('watchServer', function () {
    var watcher = gulp.watch('./src/server/**/*.ts', ['buildServer']);
    watcher.on('change', function (event) {
        console.log("Rebuilding Server Only: ");
    });
});
gulp.task('watchClient', function () {
    var watcher = gulp.watch('./src/client/**/*.*', ['buildClient']);
    watcher.on('change', function (event) {
        console.log("Rebuilding Client Only: ");
    });
});
gulp.task('default', ['nodemon']);
