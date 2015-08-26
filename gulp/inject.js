const gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    wiredep = require('wiredep').stream;

module.exports = options =>
    gulp.task('inject', ['scripts', 'styles'],  () => {
        var injectStyles = gulp.src([
            options.tmp + '/app/**/*.css',
            '!' + options.tmp + '/app/vendor.css'
        ], {read: false});


        var injectScripts = gulp.src([
            `${options.tmp}/app/system.config.js`,
            `!${options.tmp}/app/index.js`
        ], {read: false});

        var injectOptions = {
            ignorePath: [options.src, options.tmp],
            addRootSlash: false
        };

        return gulp.src(`${options.src}/*.html`)
            .pipe($.inject(injectStyles, injectOptions))
            .pipe($.inject(injectScripts, injectOptions))
            .pipe(wiredep(options.wiredep))
            .pipe(gulp.dest(options.tmp));

    });
