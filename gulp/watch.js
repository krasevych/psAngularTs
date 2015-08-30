const gulp = require('gulp');

const onlyChange = (event, task) =>
    event.type === 'changed' ? gulp.start(task) : gulp.start('inject');

module.exports = options =>
    gulp.task('watch', ['views', 'inject'], () => {
        gulp.watch([`${options.src}/*.html`, 'bower.json'], ['inject']);

        gulp.watch(`${options.src}/app/**/*.less`, event => onlyChange(event, 'styles'));

        gulp.watch(`${options.src}/app/**/*.ts`, event => onlyChange(event, 'scripts'));

        gulp.watch(`${options.src}/app/**/*.jade`, ['views']);
    });
