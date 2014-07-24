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
        restrict: 'E',
        scope: {
            field:'='
        },
        link: linker
    };
});
