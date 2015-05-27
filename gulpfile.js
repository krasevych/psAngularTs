const gulp = require('gulp'),
  ts = require('gulp-typescript');

gulp.task('default', function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      out: 'output.js'
    }));
  return tsResult.js.pipe(gulp.dest('built/local'));
});