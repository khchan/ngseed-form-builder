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
  $scope.fetchCollection = function(field) {
    // var items = [
    //     {
    //         "roles": [
    //             {
    //                 "name": "admin",
    //                 "active": true,
    //                 "createdAt": "2015-05-12T14:30:44.810Z",
    //                 "updatedAt": "2015-05-12T14:30:44.810Z",
    //                 "id": "55520e947891f30037a5cf27"
    //             }
    //         ],
    //         "createdBy": "55520e947891f30037a5cf2a",
    //         "owner": "55520e947891f30037a5cf2a",
    //         "username": "admin",
    //         "email": "admin@example.com",
    //         "createdAt": "2015-05-12T14:30:44.858Z",
    //         "updatedAt": "2015-05-14T14:32:41.683Z",
    //         "id": "55520e947891f30037a5cf2a",
    //         "role": "55520e947891f30037a5cf27",
    //         "rel": "user",
    //         "href": "http://localhost:1337/api/user/55520e947891f30037a5cf2a"
    //     },
    //     {
    //         "roles": [
    //             {
    //                 "name": "coordinator",
    //                 "active": true,
    //                 "createdAt": "2015-05-12T14:30:45.252Z",
    //                 "updatedAt": "2015-05-12T14:30:45.252Z",
    //                 "id": "55520e957891f30037a5cf5c"
    //             }
    //         ],
    //         "owner": "55520ed37891f30037a5cf87",
    //         "username": "coordinator",
    //         "email": "coord@example.com",
    //         "createdAt": "2015-05-12T14:31:47.538Z",
    //         "updatedAt": "2015-05-12T14:31:47.566Z",
    //         "id": "55520ed37891f30037a5cf87",
    //         "prefix": "Mr.",
    //         "firstname": "Coord",
    //         "lastname": "Inator",
    //         "role": "55520e957891f30037a5cf5c",
    //         "rel": "user",
    //         "href": "http://localhost:1337/api/user/55520ed37891f30037a5cf87"
    //     },
    //     {
    //         "roles": [
    //             {
    //                 "name": "subject",
    //                 "active": true,
    //                 "createdAt": "2015-05-12T14:30:45.253Z",
    //                 "updatedAt": "2015-05-12T14:30:45.253Z",
    //                 "id": "55520e957891f30037a5cf5d"
    //             }
    //         ],
    //         "owner": "555213d9bfea46d437082d56",
    //         "username": "subject",
    //         "email": "subject@email.com",
    //         "createdAt": "2015-05-12T14:53:13.288Z",
    //         "updatedAt": "2015-05-12T14:53:13.332Z",
    //         "id": "555213d9bfea46d437082d56",
    //         "prefix": "Ms.",
    //         "firstname": "Subj",
    //         "lastname": "Ect",
    //         "role": "55520e957891f30037a5cf5d",
    //         "rel": "user",
    //         "href": "http://localhost:1337/api/user/555213d9bfea46d437082d56"
    //     },
    //     {
    //         "roles": [
    //             {
    //                 "name": "admin",
    //                 "active": true,
    //                 "createdAt": "2015-05-12T14:30:44.810Z",
    //                 "updatedAt": "2015-05-12T14:30:44.810Z",
    //                 "id": "55520e947891f30037a5cf27"
    //             }
    //         ],
    //         "owner": "55521bda57ecb67548f1203c",
    //         "username": "johndoe",
    //         "email": "johndoe@email.com",
    //         "createdAt": "2015-05-12T15:27:22.005Z",
    //         "updatedAt": "2015-05-12T15:28:02.101Z",
    //         "id": "55521bda57ecb67548f1203c",
    //         "prefix": "Mr.",
    //         "firstname": "John",
    //         "lastname": "Doe",
    //         "role": "55520e947891f30037a5cf27",
    //         "rel": "user",
    //         "href": "http://localhost:1337/api/user/55521bda57ecb67548f1203c"
    //     }
    // ];
    
    return $http.get(field.field_userURL).then(function(response){
      var items = response.data.items;
      _.remove(items, function(item) {
        return _.include($scope.field.field_value, item.id);
      });
      $scope.fetchedItems = items;      
    }).catch(function(err) {
      $scope.fetchedItems = [];
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