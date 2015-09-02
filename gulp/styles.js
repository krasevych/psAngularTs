const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    $ = require('gulp-load-plugins')();

module.exports = options =>
    gulp.task('styles', () =>
        gulp.src(options.less)
            .pipe($.plumber(options.plumberHandler))
            .pipe($.cached('styles'))
            .pipe($.sourcemaps.init())
            .pipe($.less())
            .pipe($.sourcemaps.write())
            .pipe($.autoprefixer())
            .pipe(gulp.dest(options.tmp))
            .pipe(browserSync.reload({stream: true}))
            .pipe($.size({title: 'styles'})));
