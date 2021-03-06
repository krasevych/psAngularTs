const gulp = require('gulp'),
    runSequence = require('run-sequence');

const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = options => {
    gulp.task('partials', ['views'], () =>
            gulp.src(options.html)
                .pipe($.minifyHtml({
                    empty: true,
                    spare: true,
                    quotes: true
                }))
                .pipe($.angularTemplatecache('templateCache.js', {
                    module: options.appName,
                    root: ''
                }))
                .pipe(gulp.dest(options.partials))
    );

    gulp.task('html', ['inject', 'partials'], () => {
        const partialsInjectFile = gulp.src(`${options.partials}/templateCache.js`, {read: false});
        const partialsInjectOptions = {
            starttag: '<!-- inject:partials -->',
            ignorePath: options.partials,
            addRootSlash: false
        };

        const htmlFilter = $.filter('*.html'),
            jsFilter = $.filter('**/*.js'),
            cssFilter = $.filter('**/*.css');

        let assets;

        return gulp.src(options.tmpIndexHtml)
            .pipe($.plumber(options.plumberHandler))
            .pipe($.inject(partialsInjectFile, partialsInjectOptions))
            .pipe(assets = $.useref.assets())
            .pipe($.rev())
            .pipe(jsFilter)
            .pipe($.ngAnnotate())
            .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
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
            .pipe(gulp.dest(options.dist))
            .pipe($.size({title: `${options.dist}/`, showFiles: true}));
    });

    gulp.task('fonts', () =>
            gulp.src($.mainBowerFiles())
                .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
                .pipe($.flatten())
                .pipe(gulp.dest(options.fonts))
    );

    gulp.task('other', () =>
        gulp.src([
            `${options.src}/**/*`,
            `!${options.src}/{app,app/**,common,common/**}`,
            `!${options.src}/**/*.{html,css,js,less,ts,jade,json}`
        ])
            .pipe(gulp.dest(options.dist)));

    gulp.task('clean', done => $.del([options.dist, options.tmp], done));

    gulp.task('build', cb =>
        runSequence('clean', ['html', 'fonts', 'other'], cb));
};
