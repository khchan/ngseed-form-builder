'use strict';

describe('Controller: CreateCtrl', function(){

	beforeEach(module('controllers'));  
	beforeEach(module('services')); 

	// load the templates
	beforeEach(module('templates'));

	var scope, CreateCtrl;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		CreateCtrl = $controller('CreateCtrl', {
			$scope: scope
		});
	}));

	it('should at least be defined', function() {
		expect(CreateCtrl).toBeDefined();
	});
});
