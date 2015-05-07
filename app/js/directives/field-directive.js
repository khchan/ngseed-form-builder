'use strict';

/** 
 * Directive for rendering different field types in forms
 * Accepts a field object and parses its values to load appropriate templates.
 *
 * usage: <field-directive field="someField"></field-directive>
 */
angular.module('directive.field', [])

.controller('FieldCtrl', ['$scope', '$http', function ($scope, $http) {

  /** START OF USERSELECT FUNCTIONS */
  $scope.doneStatus = 'Confirm Selection';
  $scope.field.field_buffer = $scope.field.field_buffer || [];

  if ($scope.field.field_userURL && $scope.field.field_value) {
    var copy = $scope.field.field_value;
    $scope.field.field_value = [];
    _.each(copy, function (item) {
      console.log(item);
      if (item.id && item.username || item.name) {
        $scope.field.field_buffer.push({
          key: item.username || item.name,
          val: item.id
        });
      }
    });
  }
  
  $scope.selectItem = function(item) {
    if (!_.some($scope.field.field_buffer, {'val': item.id})) {
      $scope.field.field_buffer.push({
        key: item.username || item.name,
        val: item.id
      });
    }

    $scope.field.field_value = [];
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
    return [
        {
            "createdBy": "554a3d65086649373a4a4b91",
            "owner": "554a3d65086649373a4a4b91",
            "username": "admin",
            "email": "admin@example.com",
            "createdAt": "2015-05-06T16:12:21.297Z",
            "updatedAt": "2015-05-07T15:07:25.101Z",
            "id": "554a3d65086649373a4a4b91",
            "rel": "user",
            "href": "http://localhost:1337/api/user/554a3d65086649373a4a4b91"
        },
        {
            "createdBy": "554a3d65086649373a4a4b91",
            "owner": "554a3de3086649373a4a4bee",
            "username": "coord1",
            "email": "coord1@email.com",
            "createdAt": "2015-05-06T16:14:27.654Z",
            "updatedAt": "2015-05-06T16:14:27.797Z",
            "id": "554a3de3086649373a4a4bee",
            "rel": "user",
            "href": "http://localhost:1337/api/user/554a3de3086649373a4a4bee"
        },
        {
            "createdBy": "554a3d65086649373a4a4b91",
            "owner": "554a3df1086649373a4a4bf2",
            "username": "coord2",
            "email": "coord2@email.com",
            "createdAt": "2015-05-06T16:14:41.644Z",
            "updatedAt": "2015-05-06T16:14:41.839Z",
            "id": "554a3df1086649373a4a4bf2",
            "rel": "user",
            "href": "http://localhost:1337/api/user/554a3df1086649373a4a4bf2"
        },
        {
            "createdBy": "554a3d65086649373a4a4b91",
            "owner": "554a3dfd086649373a4a4bf6",
            "username": "subject1",
            "email": "subject1@email.com",
            "createdAt": "2015-05-06T16:14:53.913Z",
            "updatedAt": "2015-05-06T16:14:54.054Z",
            "id": "554a3dfd086649373a4a4bf6",
            "rel": "user",
            "href": "http://localhost:1337/api/user/554a3dfd086649373a4a4bf6"
        },
        {
            "createdBy": "554a3d65086649373a4a4b91",
            "owner": "554a3e08086649373a4a4bfa",
            "username": "subject2",
            "email": "subject2@email.com",
            "createdAt": "2015-05-06T16:15:04.194Z",
            "updatedAt": "2015-05-06T16:15:04.334Z",
            "id": "554a3e08086649373a4a4bfa",
            "rel": "user",
            "href": "http://localhost:1337/api/user/554a3e08086649373a4a4bfa"
        }
    ];
    // return $http.get(field.field_userURL).then(function(response){
    //   return response.data.items;
    // });
  }
  /** END OF USERSELECT FUNCTIONS */
  
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