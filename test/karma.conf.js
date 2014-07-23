module.exports = function(config){
  config.set({

    basePath : '../app',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'partials/directive-templates/**/*.html',
      'js/**/*.js',
      '../test/unit/**/*.js'
    ],

    preprocessors: {
      'partials/directive-templates/**/*.html': 'ng-html2js'
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
