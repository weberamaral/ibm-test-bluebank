'use strict';

const gulp              = require('gulp');

gulp.task('build', ['html', 'images', 'fonts', 'copy']);
gulp.task('default', ['clean', 'build']);
