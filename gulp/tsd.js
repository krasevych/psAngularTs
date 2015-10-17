const gulp = require('gulp'),
    gutil = require('gulp-util'),
    path = require('path'),
    tsd = require('tsd'),
    tsdJson = 'tsd.json',
    tsdApi = new tsd.getAPI(tsdJson);

module.exports = options => {
    gulp.task('tsd:install', ['tsd:purge'], () => {
        const bower = require(path.join(process.cwd(), 'bower.json'));
        const dependencies = [...Object.keys(bower.dependencies), ...options.additionalTypes];
        const query = new tsd.Query();

        dependencies.forEach(dependency => query.addNamePattern(dependency));

        const tsdOptions = new tsd.Options();
        tsdOptions.resolveDependencies = true;
        tsdOptions.overwriteFiles = true;
        tsdOptions.saveBundle = true;

        return tsdApi.readConfig()
            .then(() => tsdApi.select(query, tsdOptions))
            .then(selection => tsdApi.install(selection, tsdOptions))
            .then(installResult => {
                const written = Object.keys(installResult.written.dict),
                    removed = Object.keys(installResult.removed.dict),
                    skipped = Object.keys(installResult.skipped.dict);

                written.forEach(name => gutil.log(`Definition file written: ${name}`));

                removed.forEach(name => gutil.log(`Definition file removed: ${name}`));

                skipped.forEach(name => gutil.log(`Definition file skipped: ${name}`));
            });
    });

    gulp.task('tsd:purge', () => tsdApi.purge(true, true));

    gulp.task('tsd', ['tsd:install']);
};
