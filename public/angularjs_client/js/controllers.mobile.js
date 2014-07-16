var cleanCardMobileControllers = angular.module('cleanCardMobileControllers', ['ngTouch']);

//Starting fresh with mobile after discovering I was putting too much into controllers
//Moving ui-independent logic to services per angular docs
//This will become the desktop apps boards controller as well in the future

cleanCardMobileControllers.controller('BoardsCtrl', function($scope, $stateParams, ItemService, CategoryService, categoryFilter) {

  //Header/Navigation controls (may move to separate controller and parent view eventually)

  $scope.toggleModal = function() {
    console.log("toggle modal from local scope");
    $scope.showModal = !$scope.showModal;
  }

  var selectedCategoryIds = [];

  CategoryService.getCategories().then(function(categories) {
    $scope.categories = categories;

    //Default all categories to selected
    angular.forEach($scope.categories, function(category) {
        category.selected = true;
        selectedCategoryIds.push(category.id);
    });

    loadItems();
  });

  $scope.selectCategories = function() {
    selectedCategoryIds = [];

    angular.forEach($scope.categories, function(category, key) {
      if (category.selected) {
        selectedCategoryIds.push(category.id);
      }
    });
    console.log(selectedCategoryIds);

    loadItems();
  }

	function loadItems() {
    ItemService.getItems().then(function(items) {
      $scope.items = categoryFilter(items, selectedCategoryIds);
    });
  }

  $scope.$on('items:added', loadItems);


  $scope.nextStatus = ItemService.calculateNextStatus($stateParams.status);

  //Filter board depending on button
  $scope.filteredStatus = $stateParams.status;


  $scope.addItem = function() {
  	$scope.item.status = 'backlog';
    $scope.item.linkable_type = 'Category';
    $scope.item.linkable_id = 2;

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


