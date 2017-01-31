'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync');
const spa         = require('browser-sync-spa');

const browserSyncConf     = require('../conf/browsersync.conf');
const browserSyncConfDist = require('../conf/browsersync-dist.conf');


browserSync.use(spa({
  selector: '[ibm-test-bluebank-frontend]'
}));

gulp.task('server', ['watch'], browserSyncServe);
gulp.task('server:dist', ['build'], browserSyncDist);
gulp.task('server:e2e', ['inject'], browserSyncServe);
gulp.task('server:e2e-dist', ['build'], browserSyncDist);

function browserSyncServe (done) {
  browserSync.init(browserSyncConf());
  done();
}

function browserSyncDist (done) {
  browserSync.init(browserSyncConfDist());
  done();
}
