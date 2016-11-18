var path = require('path');
var flags = require('minimist')(process.argv.slice(2));
var appConfig = require('./app.conf.js');
var logLevels = {
  'debug': 'LOG_DEBUG',
  'disable': 'LOG_DISABLE',
  'error': 'LOG_ERROR',
  'info': 'LOG_INFO',
  'warn': 'LOG_WARN'
};
var logOpts = ['debug', 'disable', 'error', 'info', 'warn'];
var karmaPort = 9876;

// == parse the flags ==========================================================
for(var key in flags){
  var val = flags[key];
  
  switch(key){
    case 'b' :
    case 'browser' :
      flags.browser = val;
      break;
    
    case 'l' :
    case 'log' :
      if( val && RegExp(`^(${logOpts.join('|')})$`, 'i').test(val) ){
        flags.log = val.toLowerCase();
        break;
      }
      
      console.log("\n[ ERROR ] Available options for `--log` are:", logOpts.join(', '));
      process.exit(1);
      break;
    
    case 'w' :
    case 'watch' :
      flags.watch = true;
      break;
    
    case 'h' :
    case 'halp' :
      var msg = "\n Options :\n\n";
          msg += " -h, --halp   Displays available commands.\n";
          msg += ` -l, --log    Sets the type of logging output, available options are: ${logOpts.join(', ')}.\n`;
          msg += " -w, --watch  Watches for changes in tests, if any are found, the tests will be re-ran.";
      
      console.log(msg);
      process.exit(1);
      break;
  }
};

// == setup the config =========================================================
module.exports = function(karmaConfig) {
  var config = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-sinon'],

    // list of files / patterns to load in the browser
    files: [
      // load any vendor files for use within tests
      `${appConfig.paths.PUBLIC_SCRIPTS}/vendor/jquery.min.js`,
      `${appConfig.paths.PUBLIC_SCRIPTS}/vendor/handlebars.min.js`,
      // any legacy files that could possibly be proxied in, need to be loaded for karma reference (just not included)
      { pattern: `${appConfig.paths.SRC_SCRIPTS}/**/!(*.babel)*.js`, included: false },
      // bootstraps code and transpiles es6 tests files
      `${appConfig.paths.SRC_SCRIPTS}/karma.bootstrap.babel.js`
    ],

    // list of files to exclude
    exclude: [],
    
    /**
     * Normally karma will auto-load any plugins beginning with `karma-*`, but if you have to
     * run karma from the node_modules directory it will not. So it's best to add the required
     * plugins here.
     */
    plugins: [
      'karma-chai-sinon',
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-webpack'
    ],
    
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/karma.bootstrap.babel.js': ['webpack'], // use Webpack to transpile es6 files
    },
    
    proxies: {
      // allow for aliased script paths to be used for loaders in legacy scripts
      '/SRC_SCRIPTS/': `http://localhost:${karmaPort}/base/src/js/`
    },
    
    // Report all the tests that are slower than given time limit (in ms).
    reportSlowerThan: 2000,
    
    webpack: {
      cache: true,
      resolve: appConfig.webpack.resolve, // exposes path alias' to Webpack
      module: {
        loaders: [
          // transpile test & ES6 JS files
          {
            test: /\.js$/,
            exclude: [
              /node_modules/,
              /.*(?!\.babel)\.js$/
            ],
            loader: 'script',
            query: {
              plugins: [
                ['istanbul', { // adds coverage for es5 files
                  'exclude': [
                    '**/*.test.js',
                    '**/karma.bootstrap.babel.js'
                  ]
                }]
              ]
            }
          },
          // transpile test & ES6 JS files
          {
            test: /(\.test|\.babel)?\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              // slow first build, speedy future builds
              cacheDirectory: true,         
              presets: [
                'es2015' // transpile ES6 to ES5
              ],
              plugins: [
                'transform-object-assign', // adds Object.assign
                ['istanbul', { // adds coverage for es6 files
                  'exclude': [
                    '**/*.test.js',
                    '**/karma.bootstrap.babel.js'
                  ]
                }]
              ]
            }
          },
          // allow loading of templates
          {
            test: /\.(hbs|handlebars)$/, 
            loader: 'handlebars-template-loader',
            query: {
              attributes: []
            }
          }
        ]
      }
    },

    // stdout output settings
    webpackMiddleware: appConfig.middleware.webpack,
    
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'mocha', 
      'coverage'
    ],
    
    coverageReporter: {
      dir: './.coverage/',
      check: {
        // fails if global test coverage doesn't meet what's defined
        global: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100
        }
      },
      reporters: [
        // outputs to the CLI
        {
          type: 'text-summary'
        },
        // output HTML so it's easier to find what areas have missing tests
        {
          type: 'html'
        }
      ]
    },
    
    // web server port
    port: karmaPort,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: karmaConfig[logLevels[flags.log]],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: flags.watch,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [flags.browser || 'PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: !flags.watch,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };
  
  // set the final config
  karmaConfig.set(config);
}
