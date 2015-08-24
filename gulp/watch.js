const gulp = require('gulp'),
    browserSync = require('browser-sync');

const onlyChange = (event, task) =>
    event.type === 'changed' ? gulp.start(task) : gulp.start('inject');

module.exports = options => {
    gulp.task('watch', ['views', 'inject'], () => {
        gulp.watch([`${options.src}/*.html`, 'bower.json'], ['inject']);

        gulp.watch([
            options.src + '/app/**/*.css',
            options.src + '/app/**/*.less'
        ], event => onlyChange(event, 'styles'));

        gulp.watch([
            options.src + '/app/**/*.js',
            options.src + '/app/**/*.ts'
        ], event => onlyChange(event, 'scripts'));

        gulp.watch(`${options.src}/app/**/*.jade`, ['views']);

        gulp.watch(`${options.src}/app/**/*.html`, event =>browserSync.reload(event.path));
    });
};
