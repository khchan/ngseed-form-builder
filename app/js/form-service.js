angular.module('ngform-builder.services', [])
.service('FormService', function FormService() {
  return {
    fields:[
      {
        name : 'textfield',
        value : 'Textfield',
        value_type: '',
        hasOptions: false
      },
      {
        name : 'email',
        value : 'E-mail',
        value_type: '',
        hasOptions: false
      },
      {
        name : 'password',
        value : 'Password',
        value_type: '',
        hasOptions: false                
      },
      {
        name : 'radio',
        value : 'Radio Buttons',
        value_type: '',
        hasOptions: true
      },
      {
        name : 'dropdown',
        value : 'Dropdown List',
        value_type: '',
        hasOptions: true
      },
      {
        name : 'date',
        value : 'Date',
        value_type: '',
        hasOptions: false
      },
      {
        name : 'textarea',
        value : 'Text Area',
        value_type: '',
        hasOptions: false
      },
      {
        name : 'checkbox',
        value : 'Checkbox',
        value_type: '',
        hasOptions: false
      },
      {
        name : 'checkbox-group',
        value : 'Checkbox Group',
        value_type: {},
        hasOptions: true
      },
      {
        name : 'number',
        value : 'Number',
        value_type: '',
        hasOptions: false
      },
      {
        name : 'hidden',
        value : 'Hidden',
        value_type: '',
        hasOptions: false
      },
      {
        name: 'autocomplete',
        value: 'Autocomplete',
        value_type: '',
        hasOptions: false
      }
    ]
  };
});
