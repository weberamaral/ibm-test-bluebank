'use strict';

const gulp          = require('gulp');
const htmlmin       = require('gulp-htmlmin');
const templateCache = require('gulp-angular-templatecache');
const size          = require('gulp-size');
const conf          = require('../conf/gulp.conf');

function partials () {
  return gulp.src(conf.path.src('app/**/*.html'))
    .pipe(htmlmin(conf.htmlmin))
    .pipe(templateCache('templateCacheHtml.js', conf.templateCache))
    .pipe(gulp.dest(conf.path.tmp()))
    .pipe(size());
}

gulp.task('partials', partials);
