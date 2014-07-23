'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {

	beforeEach(module('services', 'controllers', 'directives'));

	var element, $compile, $scope, isoScope;

	// Load the templates module
	beforeEach(module('templates'));

	// Angular strips the underscores when injecting
	beforeEach(inject(function (_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$scope = _$rootScope_;

		$scope.testField = {
			"field_id": 1,
			"field_name": "question_1_textfield",
			"field_title": "New textfield field 1",
			"field_type": "textfield",
			"field_value": "",
			"field_placeholder": "Enter a textfield value",
			"field_validation_pattern": "*",
			"field_helpertext": "missing input or invalid",
			"field_required": true
		};

		$scope.testForm = {
			"form_type": "system",
			"form_name": "my_form",
			"form_title": "My Form",
			"form_questions": [
				$scope.testField
			],
			"submitted": false
		};
	}));

	describe('Tests for form-builder directive', function() {

		beforeEach(function () {
			var builder = angular.element('<form-builder></form-builder>');
			var form = angular.element('<form-directive form="testForm"></form-directive>');
			var field = angular.element('<field-directive field="testField"></field-directive>');
			element = $compile(builder)($scope);
			// Now run a $digest cycle to update your template with new data
			$scope.$apply();
		});

		it("should correctly render out the form-builder directive", function() {    
			// console.log(element.html()) 	
			return true;
		});
	});	
});