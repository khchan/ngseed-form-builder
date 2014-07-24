'use strict';

angular.module('directive.builder', [])
.directive('formBuilder', function() {
    return {
        restrict: 'E',
        scope: {
        	form: '='
        },
        templateUrl: 'partials/create.html',
        controller: 'CreateCtrl'
    };
});