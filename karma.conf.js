// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-04-17 using
// generator-karma 0.9.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    colors: true,

    // list of files / patterns to exclude
    exclude: [
    ],

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'test/spec/*Spec.js'},
      {pattern: 'dist/index.html', included: false},
      'dist/js/L.App.js'
    ],

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'mocha',
      'chai',
      'browserify'
    ],

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // preprocessors
    preprocessors: {
    },

    // web server port
    port: 8080,

    // Uncomment the following lines if you are using grunt's server to run the tests
    proxies: {
      '/': 'http://localhost:9000/'
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    // URL root prevent conflicts with the site root
    urlRoot: '_karma_'
  });
};
