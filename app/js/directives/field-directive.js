'use strict';

angular.module('directive.field', [])
.directive('fieldDirective', function ($http, $compile) {

    var getTemplateUrl = function(field) {
        var type = field.field_type;
        var templateUrl = '';

        switch(type) {
            case 'textfield':
                templateUrl = 'partials/directive-templates/field/textfield.html';
                break;
            case 'email':
                templateUrl = 'partials/directive-templates/field/email.html';
                break;
            case 'textarea':
                templateUrl = 'partials/directive-templates/field/textarea.html';
                break;
            case 'checkbox':
                templateUrl = 'partials/directive-templates/field/checkbox.html';
                break;
            case 'number':
                templateUrl = 'partials/directive-templates/field/number.html';
                break;
            case 'date':
                templateUrl = 'partials/directive-templates/field/date.html';
                break;
            case 'dropdown':
                templateUrl = 'partials/directive-templates/field/dropdown.html';
                break;
            case 'hidden':
                templateUrl = 'partials/directive-templates/field/hidden.html';
                break;
            case 'password':
                templateUrl = 'partials/directive-templates/field/password.html';
                break;
            case 'radio':
                templateUrl = 'partials/directive-templates/field/radio.html';
                break;
        }
        return templateUrl;
    }

    var linker = function(scope, element) {
        // GET template content from path
        var templateUrl = getTemplateUrl(scope.field);
        $http.get(templateUrl).success(function(data) {
            element.html(data);
            $compile(element.contents())(scope);
        });
    }

    return {
        template: '<div>{{field}}</div>',
        restrict: 'E',
        scope: {
            field:'='
        },
        link: linker
    };
});
