'use strict';

// Declare app level module which depends on filters, and services
angular.module('ngformBuilder', [
    'ui.sortable',
	'ui.bootstrap',
	'ngRoute',
	'services',
	'directives',
	'controllers'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'partials/create.html', controller: 'CreateCtrl'});
	$routeProvider.otherwise({redirectTo: '/'});
}]);
