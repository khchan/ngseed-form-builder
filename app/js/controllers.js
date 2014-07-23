angular.module('controllers', [])
.controller('CreateCtrl', function ($scope, FormService) {

    // preview form mode
    $scope.previewMode = false;

    var form = angular.copy($scope.form);
    
    // new form
    if (_.isEmpty(form)) {
        $scope.form = angular.copy($scope.form) || {};
        $scope.form.form_type = 'system';
        $scope.form.form_name = 'my_form';
        $scope.form.form_title = 'My Form';
        $scope.form.form_questions = [];
        lastAddedID = 0;
    } else {
        angular.copy(form, $scope.form);
        lastAddedID = form.form_questions.length;
    }

    // previewForm - for preview purposes, form will be copied into this
    // otherwise, actual form might get manipulated in preview mode
    $scope.previewForm = {};

    // add new field drop-down:
    $scope.addField = {};
    $scope.addField.types = FormService.fields;
    $scope.addField.new = $scope.addField.types[0].name;
    $scope.addField.lastAddedID = lastAddedID;

    // accordion settings
    $scope.accordion = {}
    $scope.accordion.oneAtATime = true;

    // create new field button click
    $scope.addNewField = function(){

        // incr field_id counter
        $scope.addField.lastAddedID++;

        var newField = {
            "field_id" : $scope.addField.lastAddedID,
            "field_name" : "question_"+$scope.addField.lastAddedID+"_"+$scope.addField.new,
            "field_title" : "New " + $scope.addField.new + " field " + $scope.addField.lastAddedID,
            "field_type" : $scope.addField.new,
            "field_value" : "",
            "field_placeholder" : "Enter a "+$scope.addField.new+" value",
            "field_validation_pattern" : "*",
            "field_helpertext" : "missing input or invalid",
            "field_required" : true
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
            "option_value" : option_id
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
            var title = 'Error';
            var msg = 'No fields added yet, please add fields to the form before preview.';
            var btns = [{result:'ok', label: 'OK', cssClass: 'btn-primary'}];

            // $dialog.messageBox(title, msg, btns).open();
        }
        else {
            $scope.previewMode = !$scope.previewMode;
            $scope.form.submitted = false;
            angular.copy($scope.form, $scope.previewForm);
        }
    }

    // hide preview form, go back to create mode
    $scope.previewOff = function(){
        $scope.previewMode = !$scope.previewMode;
        $scope.form.submitted = false;
    }

    // decides whether field options block will be shown (true for dropdown and radio fields)
    $scope.showAddOptions = function (field){
        if(field.field_type == "radio" || field.field_type == "dropdown")
            return true;
        else
            return false;
    }

    // deletes all the fields
    $scope.reset = function (){
        $scope.form.form_questions.splice(0, $scope.form.form_questions.length);
        $scope.addField.lastAddedID = 0;
    }
});