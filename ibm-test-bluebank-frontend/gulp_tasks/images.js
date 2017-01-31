'use strict';

const gulp        = require('gulp');
const changed     = require('gulp-changed');
const imagemin    = require('gulp-imagemin');
const size        = require('gulp-size');
const browserSync = require('browser-sync');
const conf        = require('../conf/gulp.conf');

function images () {
  return gulp.src(conf.path.src('assets/images/**/*'))
    .pipe(changed(conf.path.tmp('assets/images')))
    .pipe(imagemin(conf.imagemin))
    .pipe(gulp.dest(conf.path.tmp('assets/images')))
    .pipe(size());
}

function imagesReload () {
  return images()
    .pipe(browserSync.stream());
}

gulp.task('images', images);
gulp.task('images:reload', imagesReload);
