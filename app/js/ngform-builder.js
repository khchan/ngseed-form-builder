'use strict'

angular.module('ngform-builder', [
	'ui.sortable',
	'ui.validate',
	'ui.bootstrap',
	'ui.select',
	'ngSanitize',
	/*<% ngform-builder %>*/
	'ngform-builder.controllers',
	'ngform-builder.services',
	'ngform-builder.directives'
]);