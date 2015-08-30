const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = options => {
    gulp.task('partials', ['views'], () =>
            gulp.src([
                `${options.src}/app/**/*.html`,
                `${options.tmp}/app/**/*.html`
            ])
                .pipe($.minifyHtml({
                    empty: true,
                    spare: true,
                    quotes: true
                }))
                .pipe($.angularTemplatecache('templateCache.js', {
                    module: 'testing',
                    root: 'app'
                }))
                .pipe(gulp.dest(`${options.tmp}/partials/`))
    );

    gulp.task('html', ['inject', 'partials'], () => {
        const partialsInjectFile = gulp.src(`${options.tmp}/partials/templateCache.js`, {read: false});
        const partialsInjectOptions = {
            starttag: '<!-- inject:partials -->',
            ignorePath: options.tmp + '/partials',
            addRootSlash: false
        };

        const htmlFilter = $.filter('*.html'),
            jsFilter = $.filter('**/*.js'),
            cssFilter = $.filter('**/*.css');

        let assets;

        return gulp.src(`${options.tmp}/*.html`)
            .pipe($.inject(partialsInjectFile, partialsInjectOptions))
            .pipe(assets = $.useref.assets())
            .pipe($.rev())
            .pipe(jsFilter)
            .pipe($.ngAnnotate({
                add: true,
                remove: true,
                regexp: /^[a-zA-Z0-9_\$\.\s\]\[\']+$/
            }))
            .pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', options.errorHandler('Uglify'))
            .pipe(jsFilter.restore())
            .pipe(cssFilter)
            .pipe($.csso())
            .pipe(cssFilter.restore())
            .pipe(assets.restore())
            .pipe($.useref())
            .pipe($.revReplace())
            .pipe(htmlFilter)
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true,
                conditionals: true
            }))
            .pipe(htmlFilter.restore())
            .pipe(gulp.dest(`${options.dist}/`))
            .pipe($.size({title: `${options.dist}/`, showFiles: true}));
    });

    // Only applies for fonts from bower dependencies
    // Custom fonts are handled by the 'other' task
    gulp.task('fonts', () =>
            gulp.src($.mainBowerFiles())
                .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
                .pipe($.flatten())
                .pipe(gulp.dest(`${options.dist}/fonts/`))
    );

    gulp.task('other', () =>
        gulp.src([
            `${options.src}/**/*`,
            `!${options.src}/{app,app/**}`,
            `!${options.src}/**/*.{html,css,js,less,ts,jade}`
        ])
            .pipe(gulp.dest(`${options.dist}/`)));

    gulp.task('clean', ['tsd:purge'], done => $.del([`${options.dist}/`, `${options.tmp}/`], done));

    gulp.task('build', ['html', 'fonts', 'other']);
};
