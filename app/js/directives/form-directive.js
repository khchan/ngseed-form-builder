'use strict';

/**
 * Directive for rendering forms - can be viewed as single question carousel
 * or full page form.  Accepts two callback functions to be used for form
 * submission and cancellation.
 *
 * usage: <form-directive form="scopeForm" onSubmit="submitFn()" onCancel="cancelFn()"></form-directive>
 */
angular.module('directive.form', [])
.directive('formDirective', function ($http, $compile, $templateCache) {

    var linker = function(scope, element, attrs) {
        // GET template content from path
        var templateUrl = 'partials/directive-templates/form/form.html';
        $http.get(templateUrl, {cache:$templateCache}).success(function(data) {
            element.html(data);
            $compile(element.contents())(scope);
        });
    };

    return {
        controller: function($scope){
            $scope.togglePreview = function() {
                $scope.formPreview = !$scope.formPreview;
            };
        },
        restrict: 'E',
        link: linker,
        scope: {
            form:'=',
            onSubmit:'&',
            onCancel:'&'
        }
    };
});
