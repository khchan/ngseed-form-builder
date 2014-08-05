'use strict';

angular.module('directive.validation', [])
.directive('validationDirective', function ($http, $compile, $templateCache) {

    var getTemplateUrl = function(field) {
        var type = field.field_type;
        var templateUrl = '';

        if ((type == 'textfield') ||
            (type == 'email') ||
            (type == 'password') ||
            (type == 'textarea')) {
            templateUrl = 'partials/directive-templates/validation/textfield.html';
        } else if (type == 'number') {
            templateUrl = 'partials/directive-templates/validation/number.html';
        } else {
            templateUrl = 'partials/directive-templates/validation/default.html';
        }

        return templateUrl;
    }

    var linker = function(scope, element) {
        // GET template content from path
        var templateUrl = getTemplateUrl(scope.field);
        $http.get(templateUrl, {cache:$templateCache}).success(function(data) {
            element.html(data);
            $compile(element.contents())(scope);
        });
    }

    return {
        template: '{{field}}',
        controller: 'ValidationCtrl',
        restrict: 'E',
        scope: {
            field:'='
        },
        link: linker
    };
})

.controller('ValidationCtrl', function($scope) {
    $scope.textValidationRules = [
        {name:'None', value:'none'},
        {name:'Contains', value:'contains'},
        {name:'Does not contain', value:'not_contains'},
        {name:'Min Length', value:'min_length'},
        {name:'Max Length', value:'max_length'},
        {name:'Between', value:'between'},
        {name:'Regular Expression', value:'regex'}
    ];

    $scope.numberValidationRules = [
        {name:'None', value:'none'},
        {name:'Greater than', value:'gt'},
        {name:'Greater than or equal', value:'geq'},
        {name:'Less than', value:'lt'},
        {name:'Less than or equal', value:'leq'},
        {name:'Equal', value:'eq'},
        {name:'Not Equal', value:'neq'},
        {name:'Between', value:'between'},
        {name:'Not Between', value:'not_between'}
    ];
});
