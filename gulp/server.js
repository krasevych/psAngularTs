const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    browserSyncSpa = require('browser-sync-spa'),
    util = require('util'),
    runSequence = require('run-sequence');

module.exports = options => {

    const browserSyncInit = baseDir => {
        let routes = null;
        if (baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
            routes = {
                '/bower_components': 'bower_components'
            };
        }

        browserSync.instance = browserSync.init({
            open: false,
            notify: false,
            timestamps: false,
            server: {
                baseDir: baseDir,
                routes: routes
            }
        });
    };

    browserSync.use(browserSyncSpa({selector: '[ng-app]'}));

    gulp.task('serve', () =>
        runSequence('clean', 'watch', () => browserSyncInit([options.tmp, options.src])));

    gulp.task('serve:dist', ['build'], () => browserSyncInit(options.dist));

    gulp.task('serve:e2e', ['inject'], () => browserSyncInit([options.tmp, options.src]));

    gulp.task('serve:e2e-dist', ['build'], () => browserSyncInit(options.dist));
};