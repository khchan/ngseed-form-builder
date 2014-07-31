'use strict';

angular.module('directive.field', [])
.directive('fieldDirective', function ($http, $compile, $templateCache) {

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
            case 'checkbox-group':
                templateUrl = 'partials/directive-templates/field/checkbox-group.html';
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
        $http.get(templateUrl, {cache:$templateCache}).success(function(data) {
            element.html(data);
            $compile(element.contents())(scope);
        });
    }

    return {
        template: '<div>{{field}}</div>',
        controller: 'FieldCtrl',
        restrict: 'E',
        scope: {
            field:'='
        },
        link: linker
    };
});

function FieldCtrl($scope) {
    $scope.clearExpr = function(field) {
        field.field_min = '';
        field.field_max = '';
        field.field_validation.expression = '';
    }

    $scope.validateText = function(value, field) {
        var expr = field.field_validation.expression;
        var res = true;
        if (value && value.length >= 0) {
            switch (field.field_validation.rule) {
                case 'none':         $scope.showValidateError = false; return true;
                case 'contains':     res = value.indexOf(expr) > -1; break;
                case 'not_contains': res = value.indexOf(expr) <= -1; break;
                default: break;
            }                
        }
        $scope.showValidateError = !res;
        return res;
    }

    $scope.validateNumber = function(value, field) {
        var expr = field.field_validation.expression;
        var res = true;
        if (value) {
            switch (field.field_validation.rule) {
                case 'none':        $scope.showValidateError = false; return true;
                case 'gt':          res = value > expr; break;
                case 'geq':         res = value >= expr; break;
                case 'lt':          res = value < expr; break;
                case 'leq':         res = value <= expr; break;
                case 'eq':          res = value == expr; break;
                case 'neq':         res = value != expr; break;
                case 'between':     res = value >= expr.min && value <= expr.max; break;
                case 'not_between': res = value < expr.min || value > expr.max; break;
                default: break;
            }
        }
        $scope.showValidateError = !res;
        return res;
    }
}
