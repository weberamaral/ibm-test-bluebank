'use strict';

const gulp            = require('gulp');
const path            = require('path');
const browserSync     = require('browser-sync');
const wiredep         = require('wiredep').stream;
const angularFilesort = require('gulp-angular-filesort');
const runSequence     = require('run-sequence');
const gulpInject      = require('gulp-inject');
const size            = require('gulp-size');
const conf            = require('../conf/gulp.conf');

function inject() {

  const injectStyles = gulp.src([
    conf.path.tmp('**/*.css'),
    '!' + conf.path.tmp('vendors.css')
  ], {read: false});

  const injectScripts = gulp.src([
    conf.path.src('**/*.js'),
    '!' + conf.path.src('**/*.spec.js'),
    '!' + conf.path.src('**/*.mock.js')
  ])
    .pipe(angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  const injectOptions = {
    ignorePath: [conf.paths.src, conf.paths.tmp],
    addRootSlash: false
  };

  return gulp.src(conf.path.src('index.html'))
    .pipe(gulpInject(injectStyles, injectOptions))
    .pipe(gulpInject(injectScripts, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe(gulp.dest(conf.paths.tmp))
}

function injectReload () {
  return inject()
    .pipe(browserSync.stream());
}

gulp.task('inject', ['scripts', 'styles'], inject);
gulp.task('inject:reload', ['scripts', 'styles'], injectReload);
