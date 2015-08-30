const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    mkdirp = require('mkdirp'),
    $ = require('gulp-load-plugins')();

module.exports = options =>
    gulp.task('scripts', ['tsd:install'], () => {
        mkdirp.sync(options.tmp);

        return gulp.src(`${options.src}/**/*.ts`)
            .pipe($.cached('scripts'))
            .pipe($.sourcemaps.init())
            .pipe($.tslint())
            .pipe($.tslint.report('prose', {
                emitError: false
            }))
            .pipe($.typescript({
                target: 'es5',
                module: 'commonjs'
            })).on('error', options.errorHandler('TypeScript'))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(`${options.tmp}`))
            .pipe(browserSync.reload({stream: true}))
            .pipe($.size({
                title:'js size'
            }));
    });
