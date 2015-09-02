const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    $ = require('gulp-load-plugins')();

const renameToHtml = path => path.extname = '.html';

module.exports = options =>
    gulp.task('views', () => gulp.src(options.jade)
            .pipe($.plumber(options.plumberHandler))
            .pipe($.cached('views'))
            .pipe($.consolidate('jade', {
                basedir: options.src,
                doctype: 'html',
                pretty: '  '
            }))
            .pipe($.rename(renameToHtml))
            .pipe(gulp.dest(`${options.tmp}/`))
            .pipe(browserSync.reload({stream: true}))
            .pipe($.size({title: 'html'}))
    );
