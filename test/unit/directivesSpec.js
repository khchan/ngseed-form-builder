'use strict';

describe('Directive Tests', function() {	

	var element, $compile, scope, testJSON;

	beforeEach(module('ngform-builder'));
	// Load the templateCache
	beforeEach(module('templates'));

	// Angular strips the underscores when injecting
	beforeEach(inject(function (_$compile_, _$rootScope_, $templateCache) {
		$compile = _$compile_;
		scope = _$rootScope_.$new();

		testJSON = angular.fromJson($templateCache.get('test/static-data/testForm.json'));
		scope.testField = testJSON.form_questions[0];
		scope.testForm = testJSON;
	}));

	describe('Sanity tests for form-builder directive and its children', function() {

		it('should compile the field-directive', inject(function () {
			element = angular.element('<field-directive field="testField"></field-directive>');
			element = $compile(element)(scope);
			scope.$apply();
			expect(element.text()).toNotEqual('');
		}));

		it('should compile the form-directive', inject(function () {
			element = angular.element('<form-directive></form-directive>');
			element = $compile(element)(scope);
			scope.$apply();
			expect(element.text()).toNotEqual('');
		}));

		it("should correctly render out the form-builder directive", function() {    
			element = angular.element('<form-builder form="testForm"></form-builder>');
			element = $compile(element)(scope);
			scope.$apply();
			expect(element.text()).toNotEqual('');
		});

	});	
});