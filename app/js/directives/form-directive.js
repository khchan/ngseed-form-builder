'use strict';

angular.module('directive.form', [])
.directive('formDirective', function () {
    return {
        controller: function($scope){
            $scope.submit = function(){
                alert('Form submitted..');
                $scope.form.submitted = true;
            }

            $scope.cancel = function(){
                alert('Form canceled..');
            }
        },
        templateUrl: 'partials/directive-templates/form/form.html',
        restrict: 'E',
        scope: {
            form:'='
        }
    };
});
