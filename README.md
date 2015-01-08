ngform-builder
=============

Angular Seed version of [selmanh's][selmanh] fantastic form-builder (more info about his directive can be found on his page)

[plnkr demo here](http://embed.plnkr.co/jDFSCHhO6MYOZG1D0fBA/preview)

Dependencies
------------
(Make sure you've included these scripts before including ngform-builder)
* [angular] - obviously
* [angular-bootstrap] - angularjs directives for bootstrap
* [bootstrap-css] - just the bootstrap css
* [lodash] - great library for functional programming
* [ui-sortable] - angular-ui directives for draggable objects
  * [jquery]
  * [jqueryui] 

Bindings
--------
* **form-builder**: [form] - a json form object to edit using the form builder
* **form-directive**: [showForm] - a json form object to render
* **field-directive**: [field] - a json field object to render

Getting Started
---------------
In your js:
```
angular.module('main', ['ngform-builder'])
.controller('MainCtrl', function($scope) {
  $scope.testForm = {
    "form_type": "system",
    "form_name": "my_form",
    "form_title": "My Form",
    "form_submitText": "Submit Me",
    "form_cancelText": "Cancel Me",
    "form_questions": [
      {
        "field_id": 1,
        "field_name": "question_1_textfield",
        "field_title": "New textfield field 1",
        "field_type": "textfield",
        "field_value": "",
        "field_placeholder": "Enter a textfield value",
        "field_validation": {
          "rule": "none",
          "expression": ""
        },
        "field_helpertext": "missing input or invalid",
        "field_hasOptions": false,
        "field_required": true
      }
    ]
  };
});
```
In your html:
```
<body ng-controller="MainCtrl">
  <form-builder form="testForm"></form-builder>
</body>
```
Testing
-------
To run unit tests: ```npm test```

To run e2e tests: run ```grunt``` to start server then run ```npm run protractor```

Distribution
------------
To generate a production js and minified js, simply run ```grunt build``` and these files will be created for you in the ```dist``` folder

License
-------
MIT

[jquery]:http://jquery.com/
[jqueryui]:http://jqueryui.com/
[angular]:https://angularjs.org
[angular-bootstrap]:http://angular-ui.github.io/bootstrap/
[ui-sortable]:https://github.com/angular-ui/ui-sortable
[bootstrap-css]:https://github.com/codemix/bootstrap-css
[lodash]:http://lodash.com
[selmanh]:https://github.com/selmanh/angularjs-form-builder/
