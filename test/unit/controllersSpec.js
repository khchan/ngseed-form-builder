'use strict';

describe('Controller: CreateCtrl Tests', function(){

	var scope, CreateCtrl, testJSON;

	beforeEach(module('ngform-builder'));
	// Load the templateCache
	beforeEach(module('templates'));

	// Angular strips the underscores when injecting
	beforeEach(inject(function ($controller, _$rootScope_, $templateCache) {
		scope = _$rootScope_;
		testJSON = angular.fromJson($templateCache.get('test/static-data/testForm.json'));
		CreateCtrl = $controller('CreateCtrl', {
			$scope: scope
		});
	}));	

	it('should at least be defined', function() {
		expect(CreateCtrl).toBeDefined();
	});

	it('should accept a form object as input to populate builder', function() {
		scope.form = testJSON;
		expect(scope.form.form_questions.length).toEqual(testJSON.form_questions.length);
	});

	it('should create its own form object if given an empty one', function() {
		expect(scope.form.form_questions.length).toBe(0);
	});

	it('should be able to add and delete any type of question to the form_questions', function() {
		_.each(scope.addField.types, function(type) {
			scope.addField.new = type.name;
			scope.addNewField();
		});
		expect(scope.form.form_questions.length).toEqual(testJSON.form_questions.length);

		_.each(scope.form.form_questions, function(question) {
			scope.deleteField(1);
		});
		expect(scope.form.form_questions.length).toBe(0);
	});

	it('should be able to add and remove options for questions with options', function() {
		scope.addField.new = 'radio';
		scope.addNewField();
		var field = scope.form.form_questions[0];
		scope.addOption(field);
		scope.addOption(field);
		scope.addOption(field);
		expect(field.field_options.length).toBe(3);
		scope.deleteOption(field, field.field_options[0]);
		expect(field.field_options.length).toBe(2);

		scope.addField.new = 'dropdown';
		scope.addNewField();
		field = scope.form.form_questions[1];
		scope.addOption(field);
		scope.addOption(field);
		scope.addOption(field);
		expect(field.field_options.length).toBe(3);
		scope.deleteOption(field, field.field_options[0]);
		expect(field.field_options.length).toBe(2);
	});

	it('should remove all questions if user clicks reset', function() {
		_.each(scope.addField.types, function(type) {
			scope.addField.new = type.name;
			scope.addNewField();
		});
		scope.reset();
		expect(scope.form.form_questions.length).toBe(0);
	});
});
