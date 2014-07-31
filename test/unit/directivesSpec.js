'use strict';

describe('Directive Tests', function() {

	var element, CreateCtrl, FieldCtrl, $compile, scope, testJSON;

	beforeEach(module('ngform-builder'));
	// Load the templateCache
	beforeEach(module('templates'));

	// Angular strips the underscores when injecting
	beforeEach(inject(function ($controller, _$compile_, _$rootScope_, $templateCache) {
		$compile = _$compile_;
		scope = _$rootScope_.$new();

		testJSON = angular.fromJson($templateCache.get('test/static-data/testForm.json'));
		scope.testField = testJSON.form_questions[0];
		scope.testForm = testJSON;
		CreateCtrl = $controller('CreateCtrl', {
			$scope: scope
		});

		FieldCtrl = $controller('FieldCtrl', {
			$scope: scope
		});
	}));

	describe('Field directive tests', function() {

		beforeEach(inject(function() {
			element = angular.element('<field-directive field="testField"></field-directive>');
			element = $compile(element)(scope);
			scope.$apply();	
		}));

		it('should pass the specified field through to the directive', function() {
			expect(element.text()).toNotEqual('');
		});

		it('should render each field type correctly', function() {
			_.each(scope.testForm.form_questions, function(field) {
				scope.testField = field;
				element = angular.element('<field-directive field="testField"></field-directive>');
				element = $compile(element)(scope);
				scope.$apply();
				expect(element.find('input[type="'+field.field_type+'"]')).toNotEqual(null);
			});
		});
	});

	describe('Form directive tests', function() {
		beforeEach(inject(function() {
			element = angular.element('<form-directive form="testForm"></form-directive>');
			element = $compile(element)(scope);
			scope.$apply();
		}));

		it('should pass the specified form through to the directive', function() {
			expect(element.text()).toNotEqual('');
			expect(element.find('field-directive').length).toBe(11);
		});

		it('should bind the content of each field in the form', function() {
			scope.$apply(function() {
				scope.testForm.form_questions = [];
			});
			expect(element.find('field-directive').length).toBe(0);
		})
	});

	describe('Form builder directive tests', function() {
		beforeEach(inject(function() {
			element = angular.element('<form-builder form="testForm"></form-builder>');
			element = $compile(element)(scope);
			scope.$apply();
		}));

		it('should pass the specified form through to the directive', function() {
			expect(element.text()).toNotEqual('');
		});
	});

	describe('Unit tests for text validation', function() {
		beforeEach(function() {
			element = angular.element('<form-directive form="testForm"></form-directive>');
			element = $compile(element)(scope);
			scope.$apply();

			scope.reset();
			scope.addField.new = {
                name : 'textfield',
                value : 'Textfield',
                value_type: '',
                hasOptions: false
            };
            scope.addNewField();
		});

		afterEach(function() {
			scope.reset();
		});

		it('should behave the same way if selected validation "none"', function() {
			var field = scope.form.form_questions[0];
			field.field_validation.rule = 'none';
			field.field_validation.expression = '';	
			scope.$apply();
			expect(scope.validateText(field.field_value, field)).toBe(true);

			field.field_value = 'test';
			scope.$apply();
			expect(scope.validateText(field.field_value, field)).toBe(true);
		});

		it('should contain the text "test"', function() {
			var field = scope.form.form_questions[0];
			field.field_validation.rule = 'contains';
			field.field_validation.expression = 'test';	
			field.field_value = 'wowe, such fail';
			scope.$apply();
			console.log(field.field_value);
			expect(scope.validateText(field.field_value, field)).toBe(false);

			field.field_value = 'wowe, such test';
			scope.$apply();
			expect(scope.validateText(field.field_value, field)).toBe(true);
		});

		it('should not contain the text "test"', function() {
			var field = scope.form.form_questions[0];
			field.field_validation.rule = 'not_contains';
			field.field_validation.expression = 'test';	
			field.field_value = 'wowe, such test, much coverage';
			scope.$apply();
			expect(scope.validateText(field.field_value, field)).toBe(false);

			field.field_value = 'wowe, such unit, much coverage';
			scope.$apply();
			expect(scope.validateText(field.field_value, field)).toBe(true);
		});

	});

	describe('Unit tests for number validation', function() {

		it('should behave the same way if selected validation "none"', function() {

		});

		it('should be valid for strictly greater than', function() {

		});

		it('should be valid for inclusive greater than', function() {

		});

		it('should be valid for strictly less than', function() {

		});

		it('should be valid for inclusive less than', function() {

		});

		it('should be valid for equality', function() {

		});

		it('should be valid for inequality', function() {

		});

		it('should be valid for between a range', function() {

		});

		it('should be valid for not between a range', function() {

		});				

	});
});