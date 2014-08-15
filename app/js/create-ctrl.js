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
        $scope.form.form_questions = [];
    } else {

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
            "field_id" : $scope.addField.lastAddedID,
            "field_name" : "question_"+$scope.addField.lastAddedID+"_"+$scope.addField.new.name,
            "field_title" : "New " + $scope.addField.new.name + " field " + $scope.addField.lastAddedID,
            "field_type" : $scope.addField.new.name,
            "field_value" : $scope.addField.new.value_type,
            "field_placeholder" : "Enter a "+$scope.addField.new.name+" value",
            "field_validation" : {rule:'none', expression: ''},
            "field_helpertext" : "missing input or invalid",
            "field_hasOptions": $scope.addField.new.hasOptions,
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
            $scope.form.submitted = false;
            angular.copy($scope.form, $scope.previewForm);
        }
    }

    // hide preview form, go back to create mode
    $scope.previewOff = function(){
        $scope.previewMode = !$scope.previewMode;
        $scope.form.submitted = false;
    }

    // deletes all the fields
    $scope.reset = function (){
        $scope.form.form_questions.splice(0, $scope.form.form_questions.length);
        $scope.addField.lastAddedID = 0;
    }
}]);