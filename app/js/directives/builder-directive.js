'use strict';

angular.module('directive.builder', [])
.directive('formBuilder', function() {
    return {
        restrict: 'E',
        replace: true,
        // scope: {
        // 	form: '='
        // },
        templateUrl: 'partials/create.html',
        controller: 'CreateCtrl'
    };
});