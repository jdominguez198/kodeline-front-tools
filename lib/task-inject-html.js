var utils = require('./utils');
var config = require('../cnf/config.json');

module.exports = function(
    gulp,
    inject,
    htmlReplace
) {

    return gulp.src('../{0}/{1}/*.html'.formatUnicorn(
            config.path_config.source.base,
            config.path_config.source.html.base
        ))
        .pipe(inject(
            gulp.src('../{0}/{1}/{2}/{3}'.formatUnicorn(
                config.path_config.source.base,
                config.path_config.source.html.base,
                config.path_config.source.html.layout,
                config.files.source.html.layout_open
            ))
            .pipe(inject(
                gulp.src('../{0}/{1}/{2}/{3}'.formatUnicorn(
                    config.path_config.source.base,
                    config.path_config.source.html.base,
                    config.path_config.source.html.components,
                    config.files.source.html.component_header
                )),
                {
                    starttag: '<!-- inject:header:html -->',
                    endtag: '<!-- endinject:header:html -->',
                    removeTags: true,
                    transform: function(filepath, file) {
                        return file.contents.toString('utf8')
                    }
                }
            )),
            {
                starttag: '<!-- inject:layout:open -->',
                endtag: '<!-- endinject:layout:open -->',
                removeTags: true,
                transform: function(filepath, file) {
                    return file.contents.toString('utf8')
                }
            }
        ))
        .pipe(inject(
            gulp.src('../{0}/{1}/{2}/{3}'.formatUnicorn(
                config.path_config.source.base,
                config.path_config.source.html.base,
                config.path_config.source.html.layout,
                config.files.source.html.layout_close
            ))
            .pipe(inject(
                gulp.src('../{0}/{1}/{2}/{3}'.formatUnicorn(
                    config.path_config.source.base,
                    config.path_config.source.html.base,
                    config.path_config.source.html.components,
                    config.files.source.html.component_header
                )),
                {
                    starttag: '<!-- inject:footer:html -->',
                    endtag: '<!-- endinject:footer:html -->',
                    removeTags: true,
                    transform: function(filepath, file) {
                        return file.contents.toString('utf8')
                    }
                }
            )),
            {
                starttag: '<!-- inject:layout:close -->',
                endtag: '<!-- endinject:layout:close -->',
                removeTags: true,
                transform: function(filepath, file) {
                    return file.contents.toString('utf8')
                }
            }
        ))
        .pipe(htmlReplace('{{SITE_AUTHOR}}', config.site_config.author))
        .pipe(htmlReplace('{{SITE_DESCRIPTION}}', config.site_config.description))
        .pipe(htmlReplace('{{SITE_TITLE}}', config.site_config.title))
        .pipe(htmlReplace('{{SITE_LANG}}', config.site_config.lang))
        .pipe(htmlReplace('{{SITE_URL}}', config.site_config.url))
        .pipe(gulp.dest('../{1}/'.formatUnicorn(
            config.path_config.distribution.base
        )));

};