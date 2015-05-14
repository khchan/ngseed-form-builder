'use strict';

/** 
 * Directive for rendering different field types in forms
 * Accepts a field object and parses its values to load appropriate templates.
 *
 * usage: <field-directive field="someField"></field-directive>
 */
angular.module('directive.field', [])

.controller('FieldCtrl', ['$scope', '$http', function ($scope, $http) {

  /** START OF MULTI/SINGLESELECT FUNCTIONS */
  $scope.doneStatus = 'Confirm Selection';
  $scope.field.field_buffer = $scope.field.field_buffer || [];

  if ($scope.field.field_userURL && $scope.field.field_value) {
    if ($scope.field.field_hasItems) {
      var copy = $scope.field.field_value;
      $scope.field.field_value = [];
      _.each(copy, function (item) {
        if (item.id && item.username || item.name) {
          $scope.field.field_buffer.push({
            key: item.username || item.name,
            val: item.id
          });
        }
      });  
    }
    if ($scope.field.field_hasItem) {
      $scope.valuesSelected = true;
      $http.get($scope.field.field_userURL + '/' + $scope.field.field_value)
        .then(function(resp) {
          $scope.field.field_view = {
            key: resp.data.items.name,
            val: resp.data.items.id
          };
        })
        .catch(function (err) {
          $scope.field.field_userURL = '';
          $scope.field.field_value = '';
        });
    }    
  }
  
  $scope.selectItem = function(item) {
    if ($scope.field.field_hasItems) {
      if (!_.some($scope.field.field_buffer, {'val': item.id})) {
        $scope.field.field_buffer.push({
          key: item.username || item.name,
          val: item.id
        });
      }
      $scope.field.field_value = [];  
    }

    if ($scope.field.field_hasItem) {
      $scope.field.field_view = { key: item.name || item.username, val: item.id };
      $scope.valuesSelected = !$scope.valuesSelected;
    }    
  }

  $scope.cancelItem = function() {
    $scope.field.field_view = {};
    $scope.field.field_value = '';
    $scope.valuesSelected = false;
  }

  $scope.done = function() {
    $scope.doneStatus = ($scope.valuesSelected) ? 'Confirm Selection' : 'Cancel';
    if (!$scope.valuesSelected) {
      $scope.field.field_value = _.pluck($scope.field.field_buffer, 'val');  
    } else {
      $scope.field.field_value = [];
    }    
    $scope.valuesSelected = !$scope.valuesSelected;
  }

  $scope.fetchCollection = function(field) {
    return $http.get(field.field_userURL).then(function(response){
      return response.data.items;
    });
  }
  /** END OF MULTI/SINGLESELECT FUNCTIONS */
  
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

  var linker = function(scope, element, attrs) {
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
      field: '='
    },
    link: linker
  };
});