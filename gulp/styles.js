const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    $ = require('gulp-load-plugins')(),
    wiredep = require('wiredep').stream;

module.exports = options =>
    gulp.task('styles', () => {
        const lessOptions = {
            options: [
                'bower_components',
                options.src + '/app'
            ]
        };

        const injectFiles = gulp.src([
            `${options.src}/app/**/*.less`,
            `!${options.src}/app/index.less`,
            `!${options.src}/app/vendor.less`
        ], {read: false});

        const injectOptions = {
            transform: filePath => {
                filePath = filePath.replace(`${options.src}/app/`, '');
                return `@import '${filePath}';`;
            },
            starttag: '// injector',
            endtag: '// endinjector',
            addRootSlash: false
        };

        const indexFilter = $.filter('index.less'),
            vendorFilter = $.filter('vendor.less');

        return gulp.src([
            `${options.src}/app/index.less`,
            `${options.src}/app/vendor.less`
        ])

            .pipe($.cached('styles'))
            .pipe(indexFilter)
            .pipe($.inject(injectFiles, injectOptions))
            .pipe(indexFilter.restore())
            .pipe(vendorFilter)
            .pipe(wiredep(options.wiredep))
            .pipe(vendorFilter.restore())
            .pipe($.sourcemaps.init())
            .pipe($.less(lessOptions)).on('error', options.errorHandler('Less'))
            .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(`${options.tmp}/app/`))
            .pipe(browserSync.reload({stream: true}));
    });
