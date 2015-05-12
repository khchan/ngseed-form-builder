angular.module('ngform-templates', ['partials/create.html', 'partials/directive-templates/field/checkbox-group.html', 'partials/directive-templates/field/checkbox.html', 'partials/directive-templates/field/date.html', 'partials/directive-templates/field/dropdown.html', 'partials/directive-templates/field/email.html', 'partials/directive-templates/field/hidden.html', 'partials/directive-templates/field/multiselect.html', 'partials/directive-templates/field/number.html', 'partials/directive-templates/field/password.html', 'partials/directive-templates/field/radio.html', 'partials/directive-templates/field/singleselect.html', 'partials/directive-templates/field/textarea.html', 'partials/directive-templates/field/textfield.html', 'partials/directive-templates/form/form.html', 'partials/directive-templates/validation/default.html', 'partials/directive-templates/validation/number.html', 'partials/directive-templates/validation/textfield.html']);

angular.module("partials/create.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/create.html",
    "<div class=container-narrow><h2>Form Builder</h2><br><div class=well><div class=form-fields ng-hide=previewMode><div class=form-properties><h3>Form Properties</h3><form class=form-horizontal role=form><div class=form-group><label class=\"col-sm-2 control-label\">Form Type:</label><div class=col-sm-10><input name=form-type class=form-control ng-model=form.form_type></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Form Name:</label><div class=col-sm-10><input name=form-name class=form-control ng-model=form.form_name></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Form Title:</label><div class=col-sm-10><input name=form-title class=form-control ng-model=form.form_title></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Text on Submit:</label><div class=col-sm-10><input name=form-submit-btn class=form-control ng-model=form.form_submitText></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Text on Cancel:</label><div class=col-sm-10><input name=form-cancel-btn class=form-control ng-model=form.form_cancelText></div></div></form></div><hr><h3>Questions</h3><div class=\"add-field form-inline\"><select ng-model=addField.new class=form-control ng-options=\"type as type.value for type in addField.types\"></select><button type=submit class=btn ng-click=addNewField()><span class=\"glyphicon glyphicon-plus\"></span> Add Question</button></div><hr><p ng-show=\"form.form_questions.length == 0\">No questions added yet.</p><accordion ui-sortable ng-model=form.form_questions close-others=accordion.oneAtATime><div ui-sortable=sortableOptions ng-model=form.form_questions><accordion-group ng-repeat=\"field in form.form_questions\" is-open=status.open><accordion-heading><a class=accordion-toggle>{{field.field_id}}) &nbsp;{{field.field_title}}</a> <span class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': status.open, 'glyphicon-chevron-right': !status.open}\"></span></accordion-heading><div class=accordion-edit><button class=\"btn btn-danger pull-right\" type=button ng-click=deleteField(field.field_id)><span class=\"glyphicon glyphicon-trash\"></span> Delete</button><div class=row><div class=col-md-4><b>Question Type:</b></div><div class=col-md-4>{{field.field_type}}</div></div><hr><div class=row><div class=col-md-4><b>Question Label:</b></div><div class=col-md-8><input ng-model=field.field_title class=form-control value={{field.field_title}}></div></div><div class=row><div class=col-md-4><b>Question Name:</b></div><div class=col-md-8><input ng-model=field.field_name class=form-control value={{field.field_name}}></div></div><div class=row><div class=col-md-4><b>Question Placeholder:</b></div><div class=col-md-8><input ng-model=field.field_placeholder class=form-control value=field.field_placeholder></div></div><div class=row><div class=col-md-4><b>Question Helper Text:</b></div><div class=col-md-8><input ng-model=field.field_helpertext class=form-control value=field.field_helpertext></div></div><div class=row ng-if=!field.field_hasOptions><div class=col-md-4><b>Default Value:</b></div><div class=col-md-8><input ng-model=field.field_value class=form-control value={{field.field_value}}></div></div><div class=row ng-if=\"field.field_hasItems || field.field_hasItem\"><div class=col-md-4><b>REST URL of Item(s) to Load:</b></div><div class=col-md-8><input ng-model=field.field_userURL class=form-control placeholder=\"http://localhost:1337/api/user\"></div></div><div class=row ng-if=field.field_hasOptions><div class=col-md-4><b>Question Options:</b></div><div class=col-md-8><div ng-repeat=\"option in field.field_options\"><form class=form-inline role=form><div class=form-group><input class=form-control placeholder=\"Enter name\" ng-model=option.option_title value={{option.option_title}}></div><div class=form-group><input class=form-control placeholder=\"Enter value\" ng-model=option.option_value value={{option.option_value}}></div><button type=button class=\"btn btn-danger right\" ng-click=\"deleteOption(field, option)\">-</button></form></div><button class=\"btn btn-primary btn-sm\" type=button ng-click=addOption(field)>Add Option</button></div></div><validation-directive field=field></validation-directive><div class=row><div class=col-md-4><b>Required:</b></div><div class=col-md-4><label class=radio-inline><input type=radio ng-value=true ng-selected ng-model=field.field_required> Yes</label><label class=radio-inline><input type=radio ng-value=false ng-model=field.field_required> No</label></div></div><div class=\"panel panel-info\"><div class=panel-heading><h3 class=panel-title>Preview</h3></div><div class=panel-body><field-directive field=field></field-directive></div></div></div></accordion-group></div></accordion><p class=text-center><button class=\"btn btn-primary right\" type=button ng-click=previewOn()><span class=\"glyphicon glyphicon-eye-open\"></span> Preview Form</button> <button class=\"btn btn-danger right\" type=button ng-click=reset()><span class=\"glyphicon glyphicon-refresh\"></span> Reset</button></p><br><hr><a ng-show=!showJson ng-click=\"showJson = true\">Show form json object</a> <a ng-show=showJson ng-click=\"showJson = false\">Hide form json object</a><br><br><div ng-show=showJson><h4>Form object content:</h4><pre>{{ form | json }}</pre></div></div><div class=form-fields-preview ng-show=previewMode><form-directive form=previewForm on-submit=submit() on-cancel=cancel()></form-directive><hr><p class=text-center><button class=\"btn btn-primary btn-large right\" type=button ng-click=previewOff()>Back to Create Mode</button></p></div></div></div>");
}]);

angular.module("partials/directive-templates/field/checkbox-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/checkbox-group.html",
    "<ng-form name=sub_form><div class=form-group><label for=field.field_id>{{field.field_id}}) {{field.field_title}}</label><div class=row-fluid class=checkbox-inline><label ng-repeat=\"option in field.field_options\"><input type=checkbox ng-true-value=true ng-false-value=false ng-model=field.field_value[option.option_value]> {{option.option_title}}&nbsp;</label></div><div ng-show=!sub_form.$pristine><span class=\"pull-right required-error\" ng-show=\"field.field_required && !field.field_value\">* {{field.field_helpertext}}</span></div></div></ng-form>");
}]);

angular.module("partials/directive-templates/field/checkbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/checkbox.html",
    "<ng-form name=sub_form><div class=form-group><label class=form-field-label for=field.field_id>{{field.field_id}}) {{field.field_title}}</label><input type=checkbox id=field.field_id ng-model=field.field_value ng-true-value=true ng-false-value=false></div></ng-form>");
}]);

angular.module("partials/directive-templates/field/date.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/date.html",
    "<ng-form name=sub_form><div class=form-group><label for=field.field_id>{{field.field_id}}) {{field.field_title}}</label>&nbsp; <span class=\"glyphicon glyphicon-ok\" ng-show=field.field_value></span><p class=input-group><input id=field.field_id name={{field.field_name}} value=\"{{ field.field_value | date:'fullDate' }}\" ng-required=field.field_required class=form-control disabled> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=\"openCal = !openCal\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span><div ng-init=\"openCal = false\" ng-show=openCal><datepicker ng-model=field.field_value is-open=openCal show-weeks=true></datepicker></div></p><div ng-show=!sub_form.$pristine><span class=\"pull-right required-error\" ng-show=\"field.field_required && !field.field_value\">* {{field.field_helpertext}}</span></div></div></ng-form>");
}]);

angular.module("partials/directive-templates/field/dropdown.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/dropdown.html",
    "<ng-form name=sub_form><div class=form-group><label for=field.field_id>{{field.field_id}}) {{field.field_title}}</label>&nbsp; <span class=\"glyphicon glyphicon-ok\" ng-show=\"field.field_value && !showValidateError\"></span><div class=row-fluid><select class=form-control ng-model=field.field_value ng-options=\"option.option_value as option.option_title for option in field.field_options\" ng-required=field.field_required><option value=\"\" disabled>{{field.field_placeholder}}</option></select></div><div ng-show=!sub_form.$pristine><span class=\"pull-right required-error\" ng-show=\"field.field_required && !field.field_value\">* {{field.field_helpertext}}</span></div></div></ng-form>");
}]);

angular.module("partials/directive-templates/field/email.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/email.html",
    "<ng-form name=sub_form><div class=form-group><label for=field.field_id>{{field.field_id}}) {{field.field_title}}</label>&nbsp; <span class=\"glyphicon glyphicon-ok\" ng-show=\"field.field_value && !showValidateError\"></span> <input type=email placeholder={{field.field_placeholder}} id=field.field_id name={{field.field_name}} class=form-control ng-model=field.field_value value=field.field_value ng-required=field.field_required><div ng-show=!sub_form.$pristine><span class=\"pull-right required-error\" ng-show=\"(field.field_required && !field.field_value) || showValidateError\">* {{field.field_helpertext}}</span></div></div></ng-form>");
}]);

angular.module("partials/directive-templates/field/hidden.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/hidden.html",
    "<div class=form-group><input type=hidden class=form-control ng-model=field.field_value value=field.field_value></div>");
}]);

angular.module("partials/directive-templates/field/multiselect.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/multiselect.html",
    "<ng-form name=sub_form><script type=text/ng-template id=customTemplate.html><a>\n" +
    "			<span bind-html-unsafe=\"match.model.name || match.model.username | typeaheadHighlight:query\"></span>\n" +
    "			<span ng-if=\"match.model.email\">&nbsp; | &nbsp;</span>\n" +
    "			<span>{{match.model.email}}</span>\n" +
    "		</a></script><div class=form-group><label for=field.field_id>{{field.field_id}}) {{field.field_title}}</label>&nbsp; <span class=\"glyphicon glyphicon-ok\" ng-show=\"field.field_value && !showValidateError\"></span><div class=row-fluid><button type=button ng-disabled=valuesSelected ng-repeat=\"item in field.field_buffer\" class=\"btn btn-default\" ng-if=field.field_buffer ng-click=\"field.field_buffer.splice($index, 1)\"><span class=\"glyphicon glyphicon-remove\"></span> {{item.key}}</button><div class=input-group><input ng-list ng-if=!valuesSelected ng-disabled=!field.field_userURL id={{field.field_id}} ng-model=field.field_value dynamic-name=field.field_name class=form-control typeahead=\"item.id as item.username for item in fetchCollection(field) | filter:$viewValue\" typeahead-loading=loadingItems typeahead-template-url=customTemplate.html typeahead-on-select=selectItem($item) typeahead-editable=false ng-required=field.field_required placeholder={{field.field_placeholder}}> <span class=input-group-btn><button class=\"btn btn-primary\" ng-click=done()>{{doneStatus}}</button></span></div><i ng-show=loadingItems class=\"glyphicon glyphicon-refresh\"></i></div><div ng-show=!sub_form.$pristine><span class=\"pull-right required-error\" ng-show=\"field.field_required && !field.field_value\">* {{field.field_helpertext}}</span></div></div></ng-form>");
}]);

angular.module("partials/directive-templates/field/number.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/number.html",
    "<ng-form name=sub_form><div class=form-group><label for=field.field_id>{{field.field_id}}) {{field.field_title}}</label>&nbsp; <span class=\"glyphicon glyphicon-ok\" ng-show=\"field.field_value && !showValidateError\"></span> <input type=number placeholder={{field.field_placeholder}} id=field.field_id name={{field.field_name}} class=form-control ng-model=field.field_value value=field.field_value ng-required=field.field_required ui-validate=\" 'validateNumber($value, field)' \"><div ng-show=!sub_form.$pristine><span class=\"pull-right required-error\" ng-show=\"(field.field_required && !field.field_value) || showValidateError\">* {{field.field_helpertext}}</span></div></div></ng-form>");
}]);

angular.module("partials/directive-templates/field/password.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/password.html",
    "<ng-form name=sub_form><div class=form-group><label for=field.field_id>{{field.field_id}}) {{field.field_title}}</label>&nbsp; <span class=\"glyphicon glyphicon-ok\" ng-show=\"field.field_value && !showValidateError\"></span> <input type=password id=field.field_id class=form-control name={{field.field_name}} ng-model=field.field_value value=field.field_value ng-minlength=8 ng-pattern=\"/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/\" ng-required=field.field_required placeholder={{field.field_placeholder}}><div ng-show=!sub_form.$pristine><span class=\"pull-right required-error\" ng-show=\"(field.field_required && !field.field_value) || showValidateError\">* {{field.field_helpertext}}</span></div></div></ng-form>");
}]);

angular.module("partials/directive-templates/field/radio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/radio.html",
    "<ng-form name=sub_form><div class=form-group><label for=field.field_id>{{field.field_id}}) {{field.field_title}}</label>&nbsp;<div ng-repeat=\"option in field.field_options\" class=row-fluid><label><input type=radio value={{option.option_value}} ng-model=field.field_value ng-required=\"field.field_required\"> &nbsp; <span ng-bind=option.option_title></span></label></div><div ng-show=!sub_form.$pristine><span class=required-error ng-show=\"field.field_required && !field.field_value\">* {{field.field_helpertext}}</span></div></div></ng-form>");
}]);

angular.module("partials/directive-templates/field/singleselect.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/singleselect.html",
    "<ng-form name=sub_form><script type=text/ng-template id=itemTemplate.html><a>\n" +
    "			<span bind-html-unsafe=\"match.model.name || match.model.username | typeaheadHighlight:query\"></span>\n" +
    "		</a></script><div class=form-group><label for=field.field_id>{{field.field_id}}) {{field.field_title}}</label>&nbsp; <span class=\"glyphicon glyphicon-ok\" ng-show=\"field.field_value && !showValidateError\"></span><div class=row-fluid><button type=button class=\"btn btn-default\" ng-if=field.field_value ng-click=cancelItem()><span class=\"glyphicon glyphicon-remove\"></span> {{field.field_view.key}}</button> <input ng-if=!valuesSelected ng-disabled=!field.field_userURL id={{field.field_id}} data-ng-model=field.field_value dynamic-name=field.field_name class=form-control typeahead=\"item.id as item.name for item in fetchCollection(field) | filter:$viewValue\" typeahead-loading=loadingItems typeahead-template-url=itemTemplate.html typeahead-on-select=selectItem($item) typeahead-editable=false ng-required=field.field_required placeholder={{field.field_placeholder}}> <i ng-show=loadingItems class=\"glyphicon glyphicon-refresh\"></i></div><div ng-show=!sub_form.$pristine><span class=\"pull-right required-error\" ng-show=\"field.field_required && !field.field_value\">* {{field.field_helpertext}}</span></div></div></ng-form>");
}]);

angular.module("partials/directive-templates/field/textarea.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/textarea.html",
    "<ng-form name=sub_form><div class=form-group><label for=field.field_id>{{field.field_id}}) {{field.field_title}}</label>&nbsp; <span class=\"glyphicon glyphicon-ok\" ng-show=\"field.field_value && !showValidateError\"></span><textarea type=text id=field.field_id name={{field.field_name}} data-ng-model=field.field_value ui-validate=\" 'validateText($value, field)' \" value=field.field_value ng-required=field.field_required class=form-control placeholder={{field.field_placeholder}}></textarea><div ng-show=!sub_form.$pristine><span class=\"pull-right required-error\" ng-show=\"(field.field_required && !field.field_value) || showValidateError\">* {{field.field_helpertext}}</span></div></div></ng-form>");
}]);

angular.module("partials/directive-templates/field/textfield.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/field/textfield.html",
    "<ng-form name=sub_form><div class=form-group><label for={field.field_name}>{{field.field_id}}) {{field.field_title}}</label>&nbsp; <span class=\"glyphicon glyphicon-ok\" ng-show=\"field.field_value && !showValidateError\"></span> <input id={{field.field_id}} dynamic-name=field.field_name class=form-control data-ng-model=field.field_value ui-validate=\" 'validateText($value, field)' \" value=field.field_value ng-required=field.field_required placeholder={{field.field_placeholder}}><div ng-show=!sub_form.$pristine><span class=\"pull-right required-error\" ng-show=\"(field.field_required && !field.field_value) || showValidateError\">* {{field.field_helpertext}}</span></div></div></ng-form>");
}]);

angular.module("partials/directive-templates/form/form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/form/form.html",
    "<div ng-if=formPreview><h1 class=text-center>{{ form.form_title }}</h1><section class=row><div class=\"col-sm-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3\"><ng-form name=my_form class=form-horizontal novalidate autocomplete=off><fieldset><field-directive ng-repeat=\"field in form.form_questions\" field=field></field-directive><div data-ng-show=error class=\"text-center text-danger\"><strong>{{error}}</strong></div><div class=modal-footer><button class=\"btn btn-primary right\" type=button ng-disabled=my_form.$invalid ng-click=onSubmit()>{{form.form_submitText}}</button> <button class=\"btn btn-warning right\" type=button ng-click=onCancel()>{{form.form_cancelText}}</button></div></fieldset></ng-form></div></section></div>");
}]);

angular.module("partials/directive-templates/validation/default.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/validation/default.html",
    "");
}]);

angular.module("partials/directive-templates/validation/number.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/validation/number.html",
    "<div class=row><div class=col-md-4><b>Custom Validation</b></div><div class=col-md-8><button type=button class=\"btn btn-info btn-xs\" ng-click=\"showValidation = !showValidation\">Hide/Show</button></div></div><div ng-init=\"showValidation = false\" ng-show=showValidation><div class=row><div class=col-md-4>Number Validation:</div><div class=col-md-4><select class=form-control ng-model=field.field_validation.rule ng-change=clearExpr(field)><option value=\"\" disabled>Select a rule</option><option ng-repeat=\"rule in numberValidationRules\" value={{rule.value}}>{{rule.name}}</option></select></div><div ng-switch=field.field_validation.rule><div ng-switch-when=between><div class=col-md-2><input type=number placeholder=Min ng-model=field.field_validation.expression.min class=form-control></div><div class=col-md-2><input type=number placeholder=Max ng-model=field.field_validation.expression.max class=form-control></div></div><div ng-switch-when=not_between><div class=col-md-2><input type=number required placeholder=Min ng-model=field.field_validation.expression.min class=form-control></div><div class=col-md-2><input type=number required placeholder=Max ng-model=field.field_validation.expression.max class=form-control></div></div><div class=col-md-4 ng-switch-default><input type=number ng-disabled=\"field.field_validation.rule == 'none'\" ng-model=field.field_validation.expression class=\"form-control\"></div></div></div></div>");
}]);

angular.module("partials/directive-templates/validation/textfield.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/directive-templates/validation/textfield.html",
    "<div class=row><div class=col-md-4><b>Custom Validation</b></div><div class=col-md-8><button type=button class=\"btn btn-info btn-xs\" ng-click=\"showValidation = !showValidation\">Hide/Show</button></div></div><div ng-init=\"showValidation = false\" ng-show=showValidation><div class=row><div class=col-md-4>Validation Expression:</div><div class=col-md-4><select class=form-control ng-change=\"field.field_validation.expression = ''\" ng-model=field.field_validation.rule><option value=\"\" disabled>Select a rule</option><option ng-repeat=\"rule in textValidationRules\" value={{rule.value}}>{{rule.name}}</option></select></div><div ng-switch=field.field_validation.rule><div ng-switch-when=min_length><div class=col-md-4><input type=number placeholder=Min ng-model=field.field_validation.expression class=form-control></div></div><div ng-switch-when=max_length><div class=col-md-4><input type=number placeholder=Max ng-model=field.field_validation.expression class=form-control></div></div><div ng-switch-when=between><div class=col-md-2><input type=number placeholder=Min ng-model=field.field_validation.expression.min class=form-control></div><div class=col-md-2><input type=number placeholder=Max ng-model=field.field_validation.expression.max class=form-control></div></div><div class=col-md-4 ng-switch-default><input ng-disabled=\"field.field_validation.rule == 'none'\" ng-model=field.field_validation.expression class=\"form-control\"></div></div></div></div>");
}]);
;/**
 * Controller for handling form builder interaction and functionality
 */
angular.module('ngform-builder.controllers', [])
.controller('CreateCtrl', ['$scope', '$http', 'FormService', 
function ($scope, $http, FormService) {

  // preview form mode
  $scope.previewMode = false;

  // new form
  if (_.isEmpty($scope.form)) {
    $scope.form = angular.copy($scope.form) || {};
    $scope.form.form_type = 'system';
    $scope.form.form_name = 'my_form';
    $scope.form.form_title = 'My Form';
    $scope.form.form_submitText = 'Submit';
    $scope.form.form_cancelText = 'Cancel';
    $scope.form.form_questions = [];
  }
  
  // previewForm - for preview purposes, form will be copied into this
  // otherwise, actual form might get manipulated in preview mode
  $scope.previewForm = {};

  // add new field drop-down:
  $scope.addField = {};

  $scope.addField.types = FormService.fields;
  $scope.addField.new = $scope.addField.types[0];
  $scope.addField.value_type = $scope.addField.types[0].value_type;
  $scope.addField.hasOptions = $scope.addField.types[0].hasOptions;
  $scope.addField.hasItems = $scope.addField.types[0].hasItems;
  $scope.addField.hasItem = $scope.addField.types[0].hasItem;
  $scope.addField.lastAddedID = $scope.form.form_questions.length;

  // accordion settings
  $scope.accordion = {}
  $scope.accordion.oneAtATime = true;

  // create new field button click
  $scope.addNewField = function() {
    $scope.addField.lastAddedID = $scope.form.form_questions.length;
    // incr field_id counter
    $scope.addField.lastAddedID++;

    var newField = {
      "field_id"            : $scope.addField.lastAddedID,
      "field_name"          : $scope.form.form_name+"_"+$scope.addField.new.name+"_"+$scope.addField.lastAddedID,
      "field_title"         : "New " + $scope.addField.new.name + " field " + $scope.addField.lastAddedID,
      "field_type"          : $scope.addField.new.name,
      "field_value"         : $scope.addField.new.value_type,
      "field_placeholder"   : "Enter a "+$scope.addField.new.name+" value",
      "field_validation"    : {rule:'none', expression: ''},
      "field_helpertext"    : "missing input or invalid",
      "field_hasOptions"    : $scope.addField.new.hasOptions,
      "field_hasItems"      : $scope.addField.new.hasItems,
      "field_hasItem"      : $scope.addField.new.hasItem,
      "field_required"      : true
    };

    // put newField into fields array
    $scope.form.form_questions.push(newField);
  }

  $scope.form.form_questions.sort(function (a, b) {
    return a.field_id > b.field_id
  });

  var sortQuestions = function() {
    for (var idx in $scope.form.form_questions) {
      $scope.form.form_questions[idx].field_id = ++idx;
    }
  }

  $scope.sortableOptions = {
    cursor: 'move',
    revert: true,
    stop: sortQuestions
  }

  // deletes particular field on button click
  $scope.deleteField = function (field_id){
    for(var i = 0; i < $scope.form.form_questions.length; i++){
      if($scope.form.form_questions[i].field_id == field_id){
        $scope.form.form_questions.splice(i, 1);
        break;
      }
    }
    sortQuestions();
  }

  // add new option to the field
  $scope.addOption = function (field){
    if(!field.field_options)
      field.field_options = new Array();

    var lastOptionID = 0;

    if(field.field_options[field.field_options.length-1])
      lastOptionID = field.field_options[field.field_options.length-1].option_id;

    // new option's id
    var option_id = lastOptionID + 1;

    var newOption = {
      "option_id" : option_id,
      "option_title" : "Option " + option_id,
      "option_value" : "value_" + option_id
    };

    // put new option into field_options array
    field.field_options.push(newOption);
  }

  // delete particular option
  $scope.deleteOption = function (field, option){
    for(var i = 0; i < field.field_options.length; i++){
      if(field.field_options[i].option_id == option.option_id){
        field.field_options.splice(i, 1);
        break;
      }
    }
  }

  // preview form
  $scope.previewOn = function(){
    if($scope.form.form_questions == null || $scope.form.form_questions.length == 0) {
      alert('No fields added yet, please add fields to the form before preview.');
    }
    else {
      $scope.previewMode = !$scope.previewMode;
      angular.copy($scope.form, $scope.previewForm);
    }
  }

  // hide preview form, go back to create mode
  $scope.previewOff = function(){
    $scope.previewMode = !$scope.previewMode;
  }

  // deletes all the fields
  $scope.reset = function (){
    $scope.form.form_questions.splice(0, $scope.form.form_questions.length);
    $scope.addField.lastAddedID = 0;
  }
}]);;'use strict';

/**
 * Directive for form-builder itself:
 * Takes a JSON form and bidirectionally binds it with form-builder and form-directive
 * 
 * usage: <form-builder form="scopeForm"></form-builder>
 */
angular.module('directive.builder', [])
.directive('formBuilder', function() {
  return {
    restrict: 'E',
    scope: {
      form: '='
    },
    templateUrl: 'partials/create.html',
    controller: 'CreateCtrl',
    link: {
      pre: function preLink(scope, element, attr) {
        var unregister = scope.$watch('form', function (newval, oldval) {
          if (newval.length > 0) {
            unregister();
          };
        }, true);
      }
    }
  };
});;'use strict';

/** 
 * Directive for rendering different field types in forms
 * Accepts a field object and parses its values to load appropriate templates.
 *
 * usage: <field-directive field="someField"></field-directive>
 */
angular.module('directive.field', [])

.controller('FieldCtrl', ['$scope', '$http', function ($scope, $http) {

  /** START OF MULTI/SINGLESELECT FUNCTIONS */
  $scope.doneStatus = 'Confirm Selection';
  $scope.field.field_buffer = $scope.field.field_buffer || [];

  if ($scope.field.field_userURL && $scope.field.field_value) {
    if ($scope.field.field_hasItems) {
      var copy = $scope.field.field_value;
      $scope.field.field_value = [];
      _.each(copy, function (item) {
        if (item.id && item.username || item.name) {
          $scope.field.field_buffer.push({
            key: item.username || item.name,
            val: item.id
          });
        }
      });  
    }
    if ($scope.field.field_hasItem) {
      $scope.valuesSelected = true;
      $http.get($scope.field.field_userURL + '/' + $scope.field.field_value)
        .then(function(resp) {
          $scope.field.field_view = {
            key: resp.data.items.name,
            val: resp.data.items.id
          };
        })
        .catch(function (err) {
          $scope.field.field_userURL = '';
          $scope.field.field_value = '';
        });
    }    
  }
  
  $scope.selectItem = function(item) {
    if ($scope.field.field_hasItems) {
      if (!_.some($scope.field.field_buffer, {'val': item.id})) {
        $scope.field.field_buffer.push({
          key: item.username || item.name,
          val: item.id
        });
      }
      $scope.field.field_value = [];  
    }

    if ($scope.field.field_hasItem) {
      $scope.field.field_view = { key: item.name, val: item.id };
      $scope.valuesSelected = !$scope.valuesSelected;
    }    
  }

  $scope.cancelItem = function() {
    $scope.field.field_view = {};
    $scope.field.field_value = '';
    $scope.valuesSelected = false;
  }

  $scope.done = function() {
    $scope.doneStatus = ($scope.valuesSelected) ? 'Confirm Selection' : 'Cancel';
    if (!$scope.valuesSelected) {
      $scope.field.field_value = _.pluck($scope.field.field_buffer, 'val');  
    } else {
      $scope.field.field_value = [];
    }    
    $scope.valuesSelected = !$scope.valuesSelected;
  }

  $scope.fetchCollection = function(field) {
    return $http.get(field.field_userURL).then(function(response){
      return response.data.items;
    });
  }
  /** END OF MULTI/SINGLESELECT FUNCTIONS */
  
  $scope.clearExpr = function(field) {
    field.field_min = '';
    field.field_max = '';
    field.field_validation.expression = '';
  }

  $scope.validateText = function(value, field) {
    var expr = field.field_validation.expression;
    var res = true;
    if (value && value.length >= 0) {
      switch (field.field_validation.rule) {
        case 'none':         $scope.showValidateError = false; return true;
        case 'contains':     res = value.indexOf(expr) > -1; break;
        case 'not_contains': res = value.indexOf(expr) <= -1; break;
        case 'min_length':   res = value.length >= expr; break;
        case 'max_length':   res = value.length <= expr; break;
        case 'between':      res = value.length >= expr.min && value.length <= expr.max; break;
        default: break;
      }                
    }
    $scope.showValidateError = !res;
    return res;
  }

  $scope.validateNumber = function(value, field) {
    var expr = field.field_validation.expression;
    var res = true;
    if (value) {
      switch (field.field_validation.rule) {
        case 'none':        $scope.showValidateError = false; return true;
        case 'gt':          res = value > expr; break;
        case 'geq':         res = value >= expr; break;
        case 'lt':          res = value < expr; break;
        case 'leq':         res = value <= expr; break;
        case 'eq':          res = value == expr; break;
        case 'neq':         res = value != expr; break;
        case 'between':     res = value >= expr.min && value <= expr.max; break;
        case 'not_between': res = value < expr.min || value > expr.max; break;
        default: break;
      }
    }
    $scope.showValidateError = !res;
    return res;
  }
}])

.directive('fieldDirective', function ($http, $compile, $templateCache) {

  var linker = function(scope, element, attrs) {
    // GET template content from path
    var templateUrl = 'partials/directive-templates/field/' + scope.field.field_type + '.html';
    $http.get(templateUrl, {cache:$templateCache}).success(function(data) {
      element.html(data);
      $compile(element.contents())(scope);
    });
  }

  return {
    template: '<div>{{field}}</div>',
    controller: 'FieldCtrl',
    restrict: 'E',
    scope: {
      field: '='
    },
    link: linker
  };
});;'use strict';

/**
 * Directive for rendering forms - can be viewed as single question carousel
 * or full page form.  Accepts two callback functions to be used for form
 * submission and cancellation.
 *
 * usage: <form-directive form="scopeForm" onSubmit="submitFn()" onCancel="cancelFn()"></form-directive>
 */
angular.module('directive.form', [])

// allows for dynamic form and input names in forms
.directive('dynamicName', function($compile, $parse) {
  return {
    restrict: 'A',
    terminal: true,
    priority: 100000,
    link: function(scope, elem) {
      var name = $parse(elem.attr('dynamic-name'))(scope);
      elem.removeAttr('dynamic-name');
      elem.attr('name', name);
      $compile(elem)(scope);
    }
  };
})

.directive('formDirective', function ($http, $compile, $templateCache) {

  var linker = function(scope, element, attrs, ngModel) {    
    // GET template content from path
    var templateUrl = 'partials/directive-templates/form/form.html';
    $http.get(templateUrl, {cache:$templateCache}).success(function(data) {
      element.html(data);
      $compile(element.contents())(scope);
    });

    // default to list view if form type is system
    var unreg = scope.$watch('form', function(val, old) {
      if (!_.isEmpty(val)) {
        scope.formPreview = (scope.form.form_type == 'system');
        unreg();
      }
    }, true);
  };

  return {
    restrict: 'E',
    link: linker,
    scope: {
      form:'=',
      onSubmit:'&',
      onCancel:'&'
    },
    controller: function($scope){
    },
  };
});
;angular.module('ngform-builder.directives', [
	'directive.builder',
  'directive.field',
  'directive.form',
  'directive.validation'
]);;'use strict';

/**
 * Directive handling additional validation options within form-builder
 * This directive is inserted wherever a field may have specific validation options
 */
angular.module('directive.validation', [])
.directive('validationDirective', function ($http, $compile, $templateCache) {

  var getTemplateUrl = function(field) {
    var type = field.field_type;
    var templateUrl = '';

    if ((type == 'textfield') ||
      (type == 'email') ||
      (type == 'password') ||
      (type == 'textarea')) {
      templateUrl = 'partials/directive-templates/validation/textfield.html';
    } else if (type == 'number') {
      templateUrl = 'partials/directive-templates/validation/number.html';
    } else {
      templateUrl = 'partials/directive-templates/validation/default.html';
    }

    return templateUrl;
  }

  var linker = function(scope, element) {
    // GET template content from path
    var templateUrl = getTemplateUrl(scope.field);
    $http.get(templateUrl, {cache:$templateCache}).success(function(data) {
      element.html(data);
      $compile(element.contents())(scope);
    });
  }

  return {
    template: '{{field}}',
    controller: 'ValidationCtrl',
    restrict: 'E',
    scope: {
      field:'='
    },
    link: linker
  };
})

.controller('ValidationCtrl', function($scope) {
  $scope.textValidationRules = [
    {name:'None', value:'none'},
    {name:'Contains', value:'contains'},
    {name:'Does not contain', value:'not_contains'},
    {name:'Min Length', value:'min_length'},
    {name:'Max Length', value:'max_length'},
    {name:'Between', value:'between'}
  ];

  $scope.numberValidationRules = [
    {name:'None', value:'none'},
    {name:'Greater than', value:'gt'},
    {name:'Greater than or equal', value:'geq'},
    {name:'Less than', value:'lt'},
    {name:'Less than or equal', value:'leq'},
    {name:'Equal', value:'eq'},
    {name:'Not Equal', value:'neq'},
    {name:'Between', value:'between'},
    {name:'Not Between', value:'not_between'}
  ];
});
;angular.module('ngform-builder.services', [])
.service('FormService', function FormService() {
  return {
    fields:[
      {
        name : 'textfield',
        value : 'Textfield',
        value_type: ''
      },
      {
        name : 'email',
        value : 'E-mail',
        value_type: ''
      },
      {
        name : 'password',
        value : 'Password',
        value_type: ''
      },
      {
        name : 'radio',
        value : 'Radio Buttons',
        value_type: '',
        hasOptions: true,
      },
      {
        name : 'dropdown',
        value : 'Dropdown List',
        value_type: '',
        hasOptions: true,
      },
      {
        name : 'date',
        value : 'Date',
        value_type: ''
      },
      {
        name : 'textarea',
        value : 'Text Area',
        value_type: ''
      },
      {
        name : 'checkbox',
        value : 'Checkbox',
        value_type: ''
      },
      {
        name : 'checkbox-group',
        value : 'Checkbox Group',
        value_type: {},
        hasOptions: true,
      },
      {
        name : 'number',
        value : 'Number',
        value_type: ''
      },
      {
        name : 'hidden',
        value : 'Hidden',
        value_type: ''
      },
      {
        name: 'multiselect',
        value: 'Multi Select',
        value_type: [],
        hasItems: true
      },
      {
        name: 'singleselect',
        value: 'Single Select',
        value_type: '',
        hasItem: true
      }
    ]
  };
});
;'use strict'

angular.module('ngform-builder', [
	'ui.sortable',
	'ui.validate',
	'ui.bootstrap',
	"ngform-templates",
	'ngform-builder.controllers',
	'ngform-builder.services',
	'ngform-builder.directives'
]);