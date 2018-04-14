var utils = require('./utils');
var config = require('../cnf/config.json');

module.exports = function(
    browserSync,
    htmlInjector
) {

    browserSync.use(htmlInjector, {
        files: [
            './{0}/{1}/**/*.html'.formatUnicorn(
                config.path_config.source.base,
                config.path_config.source.html.base
            ),
            './{0}/{1}/*.html'.formatUnicorn(
                config.path_config.source.base,
                config.path_config.source.html.base
            )
        ]
    });
    browserSync.init({
        open: false,
        server: {
            baseDir: './{0}/'.formatUnicorn(
                config.path_config.distribution.base
            )
        }
    })

};