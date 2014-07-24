module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'node_modules/lodash/dist/lodash.js',
      'app/bower_components/jquery/dist/jquery.min.js',
      'app/bower_components/jquery-ui/jquery-ui.min.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-ui-sortable/sortable.min.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',  
      'app/js/**/*.js',
      'test/unit/**/*.js',
      'app/partials/create.html',
      'app/partials/directive-templates/**/*.html',
      'test/static-data/testForm.json'
    ],

    preprocessors: {
      'test/static-data/testForm.json': 'ng-html2js',
      'app/partials/create.html': 'ng-html2js',
      'app/partials/directive-templates/**/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/',
      moduleName: 'templates'
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
