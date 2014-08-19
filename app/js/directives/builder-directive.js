'use strict';

/**
 * Directive for form-builder itself:
 * Takes a JSON form and bidirectionally binds it with form-builder and form-directive
 * 
 * usage: <form-builder form="scopeForm"></form-builder>
 */
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
                        unregister();
                    };
                }, true);
            }
        }
    };
});