'use strict';

/** 
 * Directive for rendering different field types in forms
 * Accepts a field object and parses its values to load appropriate templates.
 *
 * usage: <field-directive field="someField"></field-directive>
 */
angular.module('directive.field', [])

.controller('FieldCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.doneStatus = 'Confirm Selection';
  if ($scope.field.field_userURL && $scope.field.field_value) {
    // $scope.field.field_value = [{"key":"admin","val":"55476e4c10cbb0190a79a705"},{"key":"subject","val":"55476e8410cbb0190a79a761"}];

    _.map($scope.field.field_value, function(userId) {
      $http.get($scope.field.field_userURL + '/' + userId)
        .then(function (resp) {
          $scope.field.field_value = resp.data.items.username;
          $scope.field.field_buffer.push({
            key: resp.data.items.username,
            val: userId
          });
        })
        .catch(function (err) {
          $scope.field.field_value = [];
          $scope.field.field_buffer = [];          
        })
    });
  }

  $scope.selectItem = function(item) {
    if (!$scope.field.field_buffer) {
      $scope.field.field_buffer = [];
    }

    if (!_.some($scope.field.field_buffer, {'val': item.id})) {
      $scope.field.field_buffer.push({
        key: item.username,
        val: item.id
      });
    }
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
    // return [
    //     {
    //         "createdBy": "55476e4c10cbb0190a79a705",
    //         "owner": "55476e4c10cbb0190a79a705",
    //         "username": "admin",
    //         "email": "admin@example.com",
    //         "createdAt": "2015-05-04T13:04:12.054Z",
    //         "updatedAt": "2015-05-05T00:47:22.033Z",
    //         "id": "55476e4c10cbb0190a79a705",
    //         "rel": "user",
    //         "href": "http://localhost:1337/api/user/55476e4c10cbb0190a79a705"
    //     },
    //     {
    //         "createdBy": "55476e4c10cbb0190a79a705",
    //         "owner": "55476e8410cbb0190a79a761",
    //         "username": "subject",
    //         "email": "subject@email.com",
    //         "createdAt": "2015-05-04T13:05:08.084Z",
    //         "updatedAt": "2015-05-04T17:20:54.174Z",
    //         "id": "55476e8410cbb0190a79a761",
    //         "rel": "user",
    //         "href": "http://localhost:1337/api/user/55476e8410cbb0190a79a761"
    //     },
    //     {
    //         "createdBy": "55476e4c10cbb0190a79a705",
    //         "owner": "55476e9210cbb0190a79a765",
    //         "username": "coordinator",
    //         "email": "coordinator@email.com",
    //         "createdAt": "2015-05-04T13:05:22.393Z",
    //         "updatedAt": "2015-05-04T13:05:22.527Z",
    //         "id": "55476e9210cbb0190a79a765",
    //         "rel": "user",
    //         "href": "http://localhost:1337/api/user/55476e9210cbb0190a79a765"
    //     }
    // ];
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