var utils = require('./utils');
var config = require('../cnf/config.json');

module.exports = function(
    gulp,
    inject
) {
    return gulp.src('./{0}/{1}/{2}'.formatUnicorn(
        config.path_config.source.base,
        config.path_config.source.sass.base,
        config.files.source.sass.base
    ))
    .pipe(inject(
        gulp.src('./{0}/{1}/**/*.scss'.formatUnicorn(
            config.path_config.source.base,
            config.path_config.source.sass.base
            ), { read: false }
        ),
        {
            starttag: '/* inject:scss */',
            endtag: '/* endinject */',
            relative: true,
            transform: function(filepath) {
                if (filepath !== config.files.source.sass.base) {
                    var _path = filepath.split('/');
                    if (['core', 'mixins'].indexOf(_path[0]) === -1) {
                        return '@import "' + filepath + '";';
                    }
                }
            }
        }
    ))
    .pipe(inject(
        gulp.src('./{0}/{1}/{2}/*.scss'.formatUnicorn(
            config.path_config.source.base,
            config.path_config.source.sass.base,
            config.path_config.source.sass.core
            ), { read: false }
        ),
        {
            starttag: '/* inject:core:scss */',
            endtag: '/* endinject:core */',
            relative: true,
            transform: function(filepath) {
                if (filepath !== config.files.source.sass.base) {
                    return '@import "' + filepath + '";';
                }
            }
        }
    ))
    .pipe(inject(
        gulp.src('./{0}/{1}/{2}/*.scss'.formatUnicorn(
            config.path_config.source.base,
            config.path_config.source.sass.base,
            config.path_config.source.sass.mixins
            ), { read: false }
        ),
        {
            starttag: '/* inject:mixins:scss */',
            endtag: '/* endinject:mixins */',
            relative: true,
            transform: function(filepath) {
                if (filepath !== config.files.source.sass.base) {
                    return '@import "' + filepath + '";';
                }
            }
        }
    ))
    .pipe(gulp.dest('./{0}/{1}/'.formatUnicorn(
        config.path_config.source.base,
        config.path_config.source.sass.base
    )));
};