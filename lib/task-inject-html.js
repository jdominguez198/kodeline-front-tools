var utils = require('./utils');
var config = require('../cnf/config.json');

module.exports = function(
    gulp,
    inject,
    htmlReplace
) {

    return gulp.src('./{0}/{1}/*.html'.formatUnicorn(
            config.path_config.source.base,
            config.path_config.source.html.base
        ))
        .pipe(inject(
            gulp.src('./{0}/{1}/{2}/{3}'.formatUnicorn(
                config.path_config.source.base,
                config.path_config.source.html.base,
                config.path_config.source.html.layout,
                config.files.source.html.layout_open
            ))
            .pipe(inject(
                gulp.src('./{0}/{1}/{2}/{3}'.formatUnicorn(
                    config.path_config.source.base,
                    config.path_config.source.html.base,
                    config.path_config.source.html.components,
                    config.files.source.html.component_header
                )),
                {
                    starttag: config.inject_config.html_component_header.start_tag,
                    endtag: config.inject_config.html_component_header.end_tag,
                    removeTags: true,
                    transform: function(filepath, file) {
                        return file.contents.toString('utf8')
                    }
                }
            )),
            {
                starttag: config.inject_config.html_layout_open.start_tag,
                endtag: config.inject_config.html_layout_open.end_tag,
                removeTags: true,
                transform: function(filepath, file) {
                    return file.contents.toString('utf8')
                }
            }
        ))
        .pipe(inject(
            gulp.src('./{0}/{1}/{2}/{3}'.formatUnicorn(
                config.path_config.source.base,
                config.path_config.source.html.base,
                config.path_config.source.html.layout,
                config.files.source.html.layout_close
            ))
            .pipe(inject(
                gulp.src('./{0}/{1}/{2}/{3}'.formatUnicorn(
                    config.path_config.source.base,
                    config.path_config.source.html.base,
                    config.path_config.source.html.components,
                    config.files.source.html.component_footer
                )),
                {
                    starttag: config.inject_config.html_component_footer.start_tag,
                    endtag: config.inject_config.html_component_footer.end_tag,
                    removeTags: true,
                    transform: function(filepath, file) {
                        return file.contents.toString('utf8')
                    }
                }
            )),
            {
                starttag: config.inject_config.html_layout_close.start_tag,
                endtag: config.inject_config.html_layout_close.end_tag,
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
        .pipe(htmlReplace('{{PATH_ASSETS_CSS}}', config.path_config.distribution.css))
        .pipe(htmlReplace('{{PATH_ASSETS_JS}}', config.path_config.distribution.js))
        .pipe(htmlReplace('{{FILE_DIST_CSS}}', config.files.distribution.css))
        .pipe(htmlReplace('{{FILE_DIST_JS}}', config.files.distribution.js))
        .pipe(gulp.dest('./{0}/'.formatUnicorn(
            config.path_config.distribution.base
        )));

};