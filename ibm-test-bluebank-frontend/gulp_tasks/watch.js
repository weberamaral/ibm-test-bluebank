'use strict';

const gulp          = require('gulp');
const browserSync   = require('browser-sync');
const conf          = require('../conf/gulp.conf');

function isOnlyChange (event) {
  return event.type === 'changed';
}

function watch () {
  gulp.watch([
    conf.path.src('index.html'),
    'bower.json'
  ], ['inject:reload']);

  gulp.watch([
    conf.path.src('**/*.css'),
    conf.path.src('**/*.scss')
  ], function (event) {
    if (isOnlyChange(event)) gulp.start('styles:reload');
    else gulp.start('inject:reload');
  });

  gulp.watch(conf.path.src('app/**/*.js'), function (event) {
    if (isOnlyChange(event)) gulp.start('scripts:reload');
    else gulp.start('inject:reload');
  });

  gulp.watch(conf.path.src('app/**/*.html'), function (event) {
    browserSync.reload(event.path);
  });
}

gulp.task('watch', ['inject'], watch);
