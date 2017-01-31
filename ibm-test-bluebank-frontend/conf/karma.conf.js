'use strict';

const conf      = require('./gulp.conf');
const listFiles = require('./karma-files.conf');

module.exports = function (config) {
  const configuration = {
    port: 9876,
    runnerPort: 9100,
    colors: true,
    basePath: '../',
    singleRun: true,
    autoWatch: false,
    logLevel: config.LOG_ERROR,
    junitReporter: {
      outputDir: conf.paths.reports,
      useBrowserName: true,
      suite: 'ibm-test-bluebank-frontend'
    },
    browsers: [
      'PhantomJS'
    ],
    frameworks: [
      'phantomjs-shim',
      'jasmine',
      'angular-filesort'
    ],
    files: listFiles(),
    preprocessors: {},
    coverageReporter: {
      dir: conf.paths.reports,
      reporters: [
        {type: 'lcov', subdir: 'report-lcov'},
        {type: 'text-summary'}
      ]
    },
    mochaReporter: {
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x'
      }
    },
    //reporters: ['progress', 'mocha', 'junit', 'coverage'],
    reporters: ['mocha', 'coverage'],
    ngHtml2JsPreprocessor: {
      stripPrefix: conf.path.src(),
      moduleName: 'ibm-test-bluebank-frontend'
    },
    angularFilesort: {
      whitelist: [
        conf.path.tmp('**/!(*.html|*.spec|*.mock).js')
      ]
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher'),
      require('karma-phantomjs-shim'),
      require('karma-ng-html2js-preprocessor'),
      require('karma-angular-filesort'),
      require('karma-mocha-reporter')
    ]
  };

  configuration.preprocessors[conf.path.src('**/*.html')] = ['ng-html2js'];
  configuration.preprocessors[conf.path.tmp('**/!(*.spec)+(.js)')] = ['coverage'];

  config.set(configuration);
};


