'use strict';

const gulp        = require('gulp');
const filter      = require('gulp-filter');
const size        = require('gulp-size');
const bowerFiles  = require('main-bower-files');
const flatten     = require('gulp-flatten');
const conf        = require('../conf/gulp.conf');

function fonts () {
  return gulp.src(bowerFiles())
    .pipe(filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
    .pipe(flatten())
    .pipe(gulp.dest(conf.path.dist('assets/fonts')))
    .pipe(size());
}

gulp.task('fonts', fonts);
