const gulp:gulp.Gulp = require('gulp'),
    gutil = require('gulp-util'),
    wrench = require('wrench');


const options = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e',
    errorHandler: function (title) {
        return function (err) {
            gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
            this.emit('end');
        };
    },
    wiredep: {
        directory: 'bower_components',
        exclude: [/jquery/, /bootstrap\.js/, /bootstrap\.css/]
    }
};

wrench.readdirSyncRecursive('./gulp')
    .filter(file => (/\.(js)$/i).test(file))
    .map(file => require('./gulp/' + file)(options));

gulp.task('default', ['clean'], () => gulp.start('build'));