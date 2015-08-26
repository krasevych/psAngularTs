const gulp = require('gulp'),
    Builder = require('systemjs-builder');
const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = options => {
    gulp.task('sys-build', ['inject', 'partials'], cb => {
        const builder = new Builder();

        builder.loadConfig('.tmp/app/system.config.js').then(() => {
            builder.config({baseURL: '.tmp/app'});
            return builder.build('**/*.js - system.config.js', '.tmp/partials/script.js')
                .catch(err => console.log(`Build error ${err}`))
                .finally(cb)
        });
    });

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

    gulp.task('html', ['sys-build'], () => {
        const partialsInjectFile = gulp.src(`${options.tmp}/partials/*.js`, {read: false});
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
            .pipe($.replace('../../bower_components/bootstrap/fonts/', '../fonts/'))
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

    gulp.task('other', ['sys-build'], () =>
        gulp.src([
            `${options.src}/**/*`,
            `${options.tmp}/**/*.html`,
            `!${options.src}/**/*.{html,css,js,less,ts,jade}`
        ])
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true,
                conditionals: true
            }))
            .pipe(gulp.dest(`${options.dist}/`)));

    gulp.task('clean', ['tsd:purge'], done => $.del([`${options.dist}/`, `${options.tmp}/`], done));

    gulp.task('build', ['html', 'fonts', 'other'], () => gulp.start('sys-build'));
};
