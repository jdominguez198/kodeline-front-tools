// Dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const inject = require('gulp-inject');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const htmlInjector = require('bs-html-injector');
const htmlReplace = require('gulp-replace');
//const uglify = require('gulp-uglify');

// BrowserSync
const browserSync = require('browser-sync').create();

// Utils & Config
const utils = require('./lib/utils');
const config = require('./cnf/config.json');

// Tasks
const taskInjectSass = require('./lib/task-inject-sass');
const taskCompileSass = require('./lib/task-compile-sass');
const taskInjectHtml = require('./lib/task-inject-html');
const taskCompileJs = require('./lib/task-compile-js');
const taskBrowserSync = require('./lib/task-browsersync');

// Constans
const TASK_INJECT_SASS = 'inject-imports-sass';
const TASK_COMPILE_SASS = 'compile-sass';
const TASK_INJECT_HTML = 'inject-html';
const TASK_COMPILE_JS = 'compile-js';
const TASK_BROWSER_SYNC = 'browserSync';

// Task to inject the sass multiple files into one, on an specific order
gulp.task(TASK_INJECT_SASS, function() {
    return taskInjectSass( gulp, inject );
});

// Task to compile the .scss files and generate the styles.css
gulp.task(TASK_COMPILE_SASS, function() {
    return taskCompileSass( gulp, sourcemaps, sass, minifyCSS, rename, browserSync );
});

// Task to minify and concat all js files
gulp.task(TASK_COMPILE_JS, function() {
    return taskCompileJs( gulp, concat, browserSync );
});

// Task to inject the html layout files at necessary
gulp.task(TASK_INJECT_HTML, function() {
    return taskInjectHtml( gulp, inject, htmlReplace );
});

// Task to create http server and listen to changes
gulp.task(TASK_BROWSER_SYNC, function() {
    taskBrowserSync( browserSync, htmlInjector);
});

// Main task, the watcher and execution of all previous tasks
gulp.task(
    'default',
    [ TASK_INJECT_SASS, TASK_COMPILE_SASS, TASK_COMPILE_JS, TASK_INJECT_HTML, TASK_BROWSER_SYNC ],
    function() {

       gulp.watch([
           '../{0}/{1}/**/*.scss'.formatUnicorn(
               config.path_config.source.base,
               config.path_config.source.sass.base
           ),
           '../{0}/{1}/*.scss'.formatUnicorn(
               config.path_config.source.base,
               config.path_config.source.sass.base
           )
       ], [TASK_COMPILE_SASS]);
        gulp.watch([
            '../{0}/{1}/**/.js'.formatUnicorn(
                config.path_config.source.base,
                config.path_config.source.js
            ),
            '../{0}/{1}/*.js'.formatUnicorn(
                config.path_config.source.base,
                config.path_config.source.js
            )
        ], [TASK_COMPILE_JS]);
       gulp.watch('../{0}/{1}/**/*.html'.formatUnicorn(
           config.path_config.source.base,
           config.path_config.source.html.base
       ), [TASK_INJECT_HTML]);

    }
);

