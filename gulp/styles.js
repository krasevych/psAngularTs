const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    $ = require('gulp-load-plugins')();

module.exports = options =>
    gulp.task('styles', () =>
        gulp.src(options.less)
            .pipe($.cached('styles'))
            .pipe($.sourcemaps.init())
            .pipe($.less({
                options: [
                    'bower_components',
                    options.src
                ]
            })).on('error', options.errorHandler('Less'))
            .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(`${options.tmp}/`))
            .pipe(browserSync.reload({stream: true}))
            .pipe($.size({
                title: 'css size'
            })));
