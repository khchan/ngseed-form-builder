'use strict';

// Declare app level module which depends on filters, and services
angular.module('ngformBuilder', [
    'ui.sortable',
	'ui.bootstrap',
	'services',
	'directives',
	'controllers'
])

.controller(DemoCtrl);

function DemoCtrl($scope) {
	$scope.testForm = {
		"form_type": "system",
		"form_name": "my_form",
		"form_title": "My Form",
		"form_questions": [
			{
				"field_id": 1,
				"field_name": "question_1_textfield",
				"field_title": "New textfield field 1",
				"field_type": "textfield",
				"field_value": "",
				"field_placeholder": "Enter a textfield value",
				"field_validation_pattern": "*",
				"field_helpertext": "missing input or invalid",
				"field_required": true
			}
		],
		"submitted": false
	};
}
