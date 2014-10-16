'use strict';

var gulp = require('gulp');
var onejsCompiler = require('gulp-onejs-compiler');
var tsc = require('gulp-typescript');
var clean = require('gulp-rimraf');
var uglify = require('gulp-uglifyjs');
var add = require('gulp-add-src');
var less = require('gulp-less');
var cssMinify = require('gulp-minify-css');
var csstojs = require('gulp-csstojs');
var filter = require('gulp-filter');
var size = require('gulp-size');
var mergeStream = require('merge-stream');

var paths = {
    tempPath: '.tmp',
    appPath: 'app',
    appMinPath: 'app-min',
    examplePath: 'examples-compiled',
    staticFiles: ['node_modules/requirejs/require.js']
};

var amdDependencies = [
    'onejs'
];

gulp.task('clean', function() {
    return gulp.src([paths.tempPath, paths.appPath, paths.appMinPath, paths.examplePath])
        .pipe(clean());
});

gulp.task('copy-deps', ['clean'], function() {
    var stream = mergeStream();

    for (var i = 0; i < amdDependencies.length; i++) {
        var dep = amdDependencies[i];

        stream.add(
            gulp.src('node_modules/' + dep + '/dist/amd/*')
            .pipe(gulp.dest(paths.tempPath + '/ts/' + dep))
            .pipe(gulp.dest(paths.tempPath + '/example/' + dep))
            .pipe(gulp.dest(paths.examplePath + '/' + dep))
            .pipe(gulp.dest(paths.appPath + '/' + dep))
        );
    }

    return stream;
});

gulp.task('tsc-preprocess', ['copy-deps'], function() {
    var lessFilter = filter('**/*.less');

    return gulp.src(['node_modules/onejs-compiler/src/**/*', 'node_modules/onejs/src/**/*', 'src/**/*'])
        .pipe(lessFilter)
        .pipe(less())
        .pipe(cssMinify())
        .pipe(csstojs({
            typeScript: true
        }))
        .pipe(lessFilter.restore())
        .pipe(onejsCompiler())
        .pipe(gulp.dest(paths.tempPath + '/ts'));
});

gulp.task('spec-preprocess', ['copy-deps'], function() {
    return gulp.src(['spec/**/*']).pipe(gulp.dest(paths.tempPath + '/ts/spec'));
});

gulp.task('tsc', ['tsc-preprocess', 'spec-preprocess'], function() {
    return gulp.src(paths.tempPath + '/ts/**/*.ts')
        .pipe(tsc({
            module: 'amd'
        }))
        .pipe(gulp.dest(paths.appPath));
});

gulp.task('example-preprocess', ['copy-deps'], function() {
    var lessFilter = filter('**/*.less');

    return gulp.src(['node_modules/onejs-compiler/src/**/*', 'node_modules/onejs/src/**/*', 'src/**/*', 'examples/**/*'])
        .pipe(lessFilter)
        .pipe(less())
        .pipe(cssMinify())
        .pipe(csstojs({
            typeScript: true
        }))
        .pipe(lessFilter.restore())
        .pipe(onejsCompiler())
        .pipe(gulp.dest(paths.tempPath + '/example'));
});

gulp.task('example-compile', ['example-preprocess'], function() {
    return gulp.src(paths.tempPath + '/example/**/*.ts')
        .pipe(tsc({
            module: 'amd'
        }))
        .pipe(gulp.dest(paths.examplePath));
});

gulp.task('copy-examples-static-files', ['clean'], function() {
    return gulp.src(paths.staticFiles)
        .pipe(gulp.dest(paths.examplePath));
});

gulp.task('minify', ['tsc'], function() {
    return gulp.src([paths.appPath + '/*.js'])
        .pipe(uglify())
        .pipe(size({
            gzip: true
        }))
        .pipe(gulp.dest(paths.appMinPath));
});

gulp.task('copy-static-files', ['clean', 'tsc'], function() {
    return gulp.src(paths.staticFiles)
        .pipe(gulp.dest(paths.appPath))
        .pipe(uglify())
        .pipe(gulp.dest(paths.appMinPath));
});

gulp.task('examples', ['example-compile', 'copy-examples-static-files']);

gulp.task('default', ['tsc', 'minify', 'copy-static-files']);
