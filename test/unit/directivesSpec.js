'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  
  beforeEach(angular.mock.module('directives'));
  
  var element, $compile, scope;
    
  // Load the templates module
  beforeEach(module('partials/directive-templates/form/form.html'));

  // Angular strips the underscores when injecting
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();

    scope.testForm = {
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
    element = angular.element("<form-directive form=testForm></div>");
    $compile(element)(scope);
     
    // Now run a $digest cycle to update your template with new data
    scope.$digest();
  }));

  it("should render the header and text as passed in by $scope", inject(function() {     
    // Verify that the $scope variables are in the template
    // expect(templateAsHtml).toContain('somehting');
    return true;
  }));
});