const gulp = require('gulp'),
    wrench = require('wrench'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence');

const options = {
    appName: 'testing',
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
    tmpIndexHtml: '.tmp/*.html',
    partials: '.tmp/partials',
    fonts: 'dist/fonts',
    wiredep: {directory: 'bower_components'},
    plumberHandler: {
        errorHandler: function (err) {
            gutil.log(gutil.colors.red(`Error: [${err.plugin}]`), err.message);
            this.emit('end');
        }
    }
};

wrench.readdirSyncRecursive('./gulp')
    .filter(file => (/\.(js)$/i).test(file))
    .map(file => require(`./gulp/${file}`)(options));

gulp.task('default', cb => runSequence('clean', 'build', cb));