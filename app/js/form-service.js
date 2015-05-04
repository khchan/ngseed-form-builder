angular.module('ngform-builder.services', [])
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
        name: 'userselect',
        value: 'User Select',
        value_type: '',
        hasUsers: true
      }
    ]
  };
});
