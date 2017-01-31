'use strict';

const gulp          = require('gulp');
const browserSync   = require('browser-sync');
const sourcemaps    = require('gulp-sourcemaps');
const sass          = require('gulp-sass');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const size          = require('gulp-size');
const conf          = require('../conf/gulp.conf');

function styles() {
  return gulp.src(conf.path.src('styles.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})).on('error', conf.errorHandler('Sass'))
    .pipe(postcss([autoprefixer()])).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(conf.paths.tmp))
    .pipe(size());
}

function stylesReload () {
  return styles()
    .pipe(browserSync.stream());
}

gulp.task('styles', styles);
gulp.task('styles:reload', stylesReload);
