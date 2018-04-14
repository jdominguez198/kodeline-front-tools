var utils = require('./utils');
var config = require('../cnf/config.json');

module.exports = function(
    browserSync,
    htmlInjector
) {

    browserSync.use(htmlInjector, {
        files: '../src/**/*.html'
    });
    browserSync.init({
        open: false,
        server: {
            baseDir: '../dist/'
        }
    })

};