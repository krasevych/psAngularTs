const gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    wiredep = require('wiredep').stream;


module.exports = options =>
    gulp.task('inject', ['scripts', 'styles'], () => {
            const getInjectSrc = name => gulp.src(name, {read: false});

            const injectOptions = {
                ignorePath: [options.src, options.tmp],
                addRootSlash: false
            };

            return gulp.src(options.indexHtml)
                .pipe($.inject(getInjectSrc(options.css), injectOptions))
                .pipe($.inject(getInjectSrc(options.js), injectOptions))
                .pipe(wiredep(options.wiredep))
                .pipe(gulp.dest(options.tmp));
        });
