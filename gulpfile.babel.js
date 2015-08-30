const gulp = require('gulp'),
    gutil = require('gulp-util'),
    wrench = require('wrench');

const options = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    path: {
        js: 'src/**/*.js',
        html: '**/*.html',
        json: '**/*.html',
        templates: 'src/**/*.html',
        less: ['src/**/*.less', '!src/assets/**/*.less'],
        output: 'dist/',
        outputCss: 'dist/**/*.css'
    },
    errorHandler: title =>
        function (err) {
            gutil.log(gutil.colors.red(`[${title}]`), err.toString());
            this.emit('end');
        },
    wiredep: {
        directory: 'bower_components',
        overrides: {
            'angular-new-router': {
                'main': 'dist/router.es5.js'
            }
        }
    }
};

wrench.readdirSyncRecursive('./gulp')
    .filter(file => (/\.(js)$/i).test(file))
    .map(file => require(`./gulp/${file}`)(options));

gulp.task('default', ['clean'], () => gulp.start('build'));