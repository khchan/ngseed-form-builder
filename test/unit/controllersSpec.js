'use strict';

describe('Controller: CreateCtrl', function(){

  beforeEach(module('controllers'));  
  beforeEach(module('services')); 

  var CreateCtrl, scope;
  
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateCtrl = $controller('CreateCtrl', {
      $scope: scope
    });
  }));

  it('should ....', inject(function($controller) {
    //spec body
    var myCtrl1 = $controller('CreateCtrl', { $scope: {} });
    expect(myCtrl1).toBeDefined();
  }));
});
