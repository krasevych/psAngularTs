const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    browserSyncSpa = require('browser-sync-spa'),
    util = require('util');

module.exports = options => {

    const browserSyncInit = (baseDir, browser) => {
        browser = browser === undefined ? 'default' : browser;

        let routes = null;
        if (baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
            routes = {
                '/bower_components': 'bower_components'
            };
        }

        const server = {
            baseDir: baseDir,
            routes: routes
        };

        browserSync.instance = browserSync.init({
            startPath: '/',
            server: server,
            browser: browser
        });
    };

    browserSync.use(browserSyncSpa({selector: '[ng-app]'}));

    gulp.task('serve', ['watch'], () => browserSyncInit([options.tmp, options.src]));

    gulp.task('serve:dist', ['build'], () => browserSyncInit(options.dist));

    gulp.task('serve:e2e', ['inject'], () => browserSyncInit([options.tmp, options.src], []));

    gulp.task('serve:e2e-dist', ['build'], () => browserSyncInit(options.dist, []));
};