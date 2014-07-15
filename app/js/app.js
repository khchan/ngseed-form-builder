'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ui.sortable',
	'ui.bootstrap',
	'ngRoute',
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'partials/create.html', controller: 'CreateCtrl'});
	$routeProvider.otherwise({redirectTo: '/'});
}]);
