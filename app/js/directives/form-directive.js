'use strict';

angular.module('directive.form', [])
.directive('formDirective', function ($http, $compile, $templateCache) {

    var linker = function(scope, element) {
        // GET template content from path
        var templateUrl = 'partials/directive-templates/form/form.html';
        $http.get(templateUrl, {cache:$templateCache}).success(function(data) {
            element.html(data);
            $compile(element.contents())(scope);
        });
    };

    return {
        controller: function($scope){
            $scope.formPreview = false;
            
            $scope.togglePreview = function() {
                $scope.formPreview = !$scope.formPreview;
            };
            $scope.submit = function() {
                alert('Form submitted..');
                $scope.form.submitted = true;
                console.log($scope.form);
            };
            $scope.cancel = function() {
                alert('Form canceled..');
            };
        },
        restrict: 'E',
        link: linker,
        scope: {
            view: '@',
            form:'='
        }
    };
});
