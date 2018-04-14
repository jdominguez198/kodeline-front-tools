var utils = require('./utils');
var config = require('../cnf/config.json');

module.exports = function(
    gulp,
    sourcemaps,
    sass,
    minifyCSS,
    rename,
    browserSync
) {
    return gulp.src('./{0}/{1}/{2}'.formatUnicorn(
        config.path_config.source.base,
        config.path_config.source.sass.base,
        config.files.source.sass
    ))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename(config.files.distribution.css))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./{0}/{1}/'.formatUnicorn(
            config.path_config.distribution.base,
            config.path_config.distribution.css
        )))
        .pipe(browserSync.reload({
            stream: true
        }))
        ;
};