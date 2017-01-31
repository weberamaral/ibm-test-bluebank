'use strict';

const gulp    = require('gulp');
const path    = require('path');
const del     = require('del');
const filter  = require('gulp-filter');
const conf    = require('../conf/gulp.conf');

function clean () {
  return del([conf.paths.tmp, conf.paths.dist, conf.paths.reports]);
}

function copy () {
  const fileFilter = filter(function (file) {
    return file.stat.isFile();
  });
  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    '!'+path.join(conf.paths.src, '/**/*.{html,css,js,scss,jade}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}

gulp.task('clean', clean);
gulp.task('copy', copy);
