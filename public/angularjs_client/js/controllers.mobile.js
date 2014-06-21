var cleanCardMobileControllers = angular.module('cleanCardMobileControllers', ['ngTouch']);

//Starting fresh with mobile after discovering I was putting too much into controllers
//Moving ui-independent logic to services per angular docs
//This will become the desktop apps boards controller as well in the future

cleanCardMobileControllers.controller('BoardsCtrl', function ($rootScope, $scope, $stateParams, ItemService) {

  $scope.items = ItemService.all();

  $rootScope.showSubMenu = true;

  //Filter board depending on button
  $scope.filteredStatus = $stateParams.status;


  $scope.update = function(attr) {
    console.log("update called");
    ItemService.update(attr);
  }


});





