'use strict';

/** 
 * Directive for rendering different field types in forms
 * Accepts a field object and parses its values to load appropriate templates.
 *
 * usage: <field-directive field="someField"></field-directive>
 */
angular.module('directive.field', [])

.controller('FieldCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.fetchCollection = function() {
    return $http.get('http://localhost:1337/api/user').then(function(response){
      return response.data.items;
    });
  }
  
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
        case 'min_length':   res = value.length >= expr; break;
        case 'max_length':   res = value.length <= expr; break;
        case 'between':      res = value.length >= expr.min && value.length <= expr.max; break;
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
}])

.directive('fieldDirective', function ($http, $compile, $templateCache) {

  var linker = function(scope, element) {
    // GET template content from path
    var templateUrl = 'partials/directive-templates/field/' + scope.field.field_type + '.html';
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