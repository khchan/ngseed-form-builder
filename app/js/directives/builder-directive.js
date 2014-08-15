'use strict';

angular.module('directive.builder', [])
.directive('formBuilder', function() {
    return {
        restrict: 'E',
        scope: {
        	form: '='
        },
        templateUrl: 'partials/create.html',
        controller: 'CreateCtrl',
        link: {
            pre: function preLink(scope, element, attr) {
                var unregister = scope.$watch('form', function (newval, oldval) {
                    if (newval.length > 0) {
                    	console.log(scope.form);
                        unregister();
                    };
                }, true);
            }
        }
    };
});