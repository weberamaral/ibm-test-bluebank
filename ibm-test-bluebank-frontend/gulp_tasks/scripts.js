'use strict';

const gulp          = require('gulp');
const eslint        = require('gulp-eslint');
const browserSync   = require('browser-sync');
const size          = require('gulp-size');
const conf          = require('../conf/gulp.conf');

function scripts() {
  return gulp.src(conf.path.src('**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulp.dest(conf.path.tmp()))
    .pipe(size());
}

function scriptsReload () {
  return scripts()
    .pipe(browserSync.stream());
}

gulp.task('scripts', scripts);
gulp.task('scripts:reload', scriptsReload);
