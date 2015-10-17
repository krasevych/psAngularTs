const gulp = require('gulp');

const onlyChange = (event, task) =>
    event.type === 'changed' ? gulp.start(task) : gulp.start('inject');

module.exports = options =>
    gulp.task('watch', ['views', 'inject'], () => {
        gulp.watch([options.indexHtml, 'bower.json'], ['inject']);

        gulp.watch(options.less, event => onlyChange(event, 'styles'));

        gulp.watch(options.ts, event => onlyChange(event, 'scripts'));

        gulp.watch(options.jade, () => gulp.start('views'));
    });
