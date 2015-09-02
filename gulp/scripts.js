const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    mkdirp = require('mkdirp'),
    $ = require('gulp-load-plugins')();

module.exports = options =>
    gulp.task('scripts', () => {
        mkdirp.sync(options.tmp);

        return gulp.src(options.ts)
            .pipe($.plumber(options.plumberHandler))
            .pipe($.cached('scripts'))
            .pipe($.sourcemaps.init())
            .pipe($.tslint())
            .pipe($.tslint.report('prose', {emitError: false}))
            .pipe($.typescript({
                target: 'es5',
                module: 'commonjs'
            }))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(options.tmp))
            .pipe(browserSync.reload({stream: true}))
            .pipe($.size({title: 'js'}));
    });
