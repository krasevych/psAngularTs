const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    mkdirp = require('mkdirp'),
    $ = require('gulp-load-plugins')();

module.exports = function (options) {
    gulp.task('scripts', ['tsd:install'], function () {
        mkdirp.sync(options.tmp);

        return gulp.src(options.src + '/app/**/*.ts')
            .pipe($.sourcemaps.init())
            .pipe($.tslint())
            .pipe($.typescript({
                target: 'es5',
                module: 'commonjs'
            })).on('error', options.errorHandler('TypeScript'))
            .pipe($.sourcemaps.write())
            .pipe($.toJson({filename: options.tmp + '/sortOutput.json', relative: true}))
            .pipe(gulp.dest(options.tmp + '/serve/app'))
            .pipe(browserSync.reload({stream: true}))
            .pipe($.size());
    });
};
