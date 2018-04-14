var utils = require('./utils');
var config = require('../cnf/config.json');

module.exports = function(
    gulp,
    concat,
    uglify,
    browserSync
) {
    return gulp.src([
        './{0}/{1}/**/.js'.formatUnicorn(
            config.path_config.source.base,
            config.path_config.source.js
        ),
        './{0}/{1}/*.js'.formatUnicorn(
            config.path_config.source.base,
            config.path_config.source.js
        )
    ])
        .pipe(concat(config.files.distribution.js))
        .pipe(uglify())
        .pipe(gulp.dest('./{0}/{1}/'.formatUnicorn(
            config.path_config.distribution.base,
            config.path_config.distribution.js
        )))
        .pipe(browserSync.reload( { stream: true } ));

};