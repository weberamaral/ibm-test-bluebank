'use strict';

const conf = require('./gulp.conf');

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.dist
      ]
    },
    open: false,
    browser: 'google chrome',
    notify: true,
    logLevel: 'info'
  }
};
