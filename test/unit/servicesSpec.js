'use strict';

describe('Service: FormService Tests', function () {

	// load the service module
	beforeEach(module('ngform-builder'));

	// instantiate service
	var FormService;
	beforeEach(inject(function (_FormService_) {
		FormService = _FormService_;
	}));

	it('should be defined', function () {
		expect(!!FormService).toBe(true);
		return true;
	});

	it('should return a non-empty fields array', function() {
		expect(FormService.fields).toNotEqual(null);
		expect(FormService.fields.length).toNotBe(0);
	});

});