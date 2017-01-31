'use strict';

process.env.NODE_ENV = 'test';

const path  = require('path');
const gulp  = require('gulp');
const karma = require('karma');

function karmaFinishHandler(done) {
  return function (failCount) {
    done(failCount ? new Error('Failled [' + failCount + '] tests.') : null);
  };
}

function karmaSingleRun(done) {
  const config = path.join(process.cwd(), 'conf', 'karma.conf.js');
  const server = new karma.Server({configFile: config}, karmaFinishHandler(done));
  server.start();
}

function karmaAutoRun(done) {
  const config = path.join(process.cwd(), 'conf', 'karma-auto.conf.js');
  const server = new karma.Server({configFile: config}, karmaFinishHandler(done));
  server.start();
}

gulp.task('test',['inject'], karmaSingleRun);
gulp.task('test:auto', ['watch'], karmaAutoRun);
