const gulp = require('gulp'),
    gutil = require('gulp-util'),
    wrench = require('wrench');

const options = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    js: '.tmp/**/*.js',
    html: '.tmp/**/*.html',
    css: '.tmp/**/*.css',
    ts: 'src/**/*.ts',
    jade: 'src/**/*.jade',
    less: 'src/**/*.less',
    indexHtml: 'src/*.html',
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
        directory: 'bower_components'
    }
};

wrench.readdirSyncRecursive('./gulp')
    .filter(file => (/\.(js)$/i).test(file))
    .map(file => require(`./gulp/${file}`)(options));

gulp.task('default', ['clean'], () => gulp.start('build'));