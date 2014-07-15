var cleanCardMobileControllers = angular.module('cleanCardMobileControllers', ['ngTouch']);

//Starting fresh with mobile after discovering I was putting too much into controllers
//Moving ui-independent logic to services per angular docs
//This will become the desktop apps boards controller as well in the future

cleanCardMobileControllers.controller('BoardsCtrl', function($rootScope, $scope, $stateParams, ItemService, Restangular, categoryFilter) {


	//$scope.cats = rtCategories.query();

  ItemService.getItems().then(function(items) {
    $scope.items = items;
    
    var testArray = categoryFilter(items, [1]);
    console.log('testArray:');
    console.log(testArray);
  });

  $scope.$on('items:added', updateItems);

  function updateItems() {
    ItemService.getItems().then(function(items) {
      $scope.items = items;
    });   
  }

  $rootScope.showSubMenu = true;

  $scope.nextStatus = ItemService.calculateNextStatus($stateParams.status);

  //Filter board depending on button
  $scope.filteredStatus = $stateParams.status;


  $scope.addItem = function() {
  	$scope.item.status = 'backlog';
    $scope.item.linkable_type = 'Category';
    $scope.item.linkable_id = 1;

    ItemService.addItem($scope.item);
  }


  $scope.updateItem = function(item, attr) {
    ItemService.updateItem(item, attr);
  }


});


cleanCardMobileControllers.controller('ItemMobileCtrl', function($rootScope, $scope, $stateParams, $state, ItemService) {

  //$scope.item = ItemService.find($stateParams.itemId);

  ItemService.getItem($stateParams.itemId).then(function(item) {
    $scope.item = item;
    $scope.nextStatus = ItemService.calculateNextStatus($scope.item.status);
    console.log($scope.nextStatus);
  });

  $rootScope.showSubMenu = false;

  $scope.updateItem = function(item, attr) {
    ItemService.updateItem(item, attr).then(function(item) {
      console.log('do anything?');
    });
  }


  $scope.deleteItem = function(item) {
    ItemService.removeItem(item).then(function(item) {
      //Then method also called in service
      $state.go('items',{status: 'planned'} );
    });
  }
	

});


