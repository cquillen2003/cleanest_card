var cleanCardMobileControllers = angular.module('cleanCardMobileControllers', ['ngTouch']);

//Starting fresh with mobile after discovering I was putting too much into controllers
//Moving ui-independent logic to services per angular docs
//This will become the desktop apps boards controller as well in the future

cleanCardMobileControllers.controller('BoardsCtrl', function($rootScope, $scope, $stateParams, rtCategories, rtItems) {


	//$scope.cats = rtCategories.query();

  $scope.items = rtItems.all();

  $rootScope.showSubMenu = true;

  //Filter board depending on button
  $scope.filteredStatus = $stateParams.status;


  $scope.addItem = function() {
  	$scope.item.status = 'backlog';
  	rtItems.create($scope.item).then(function() {
  		$scope.item.name = '';
  	});
  }


  $scope.nextStatus = function(id, status) {
    rtItems.nextStatus(id, status);
  }


});


cleanCardMobileControllers.controller('ItemMobileCtrl', function($rootScope, $scope, $stateParams, $state, $goKey) {
  
  $scope.items = $goKey('items').$sync();

  $scope.items.$on('ready', function() {
    $scope.item = $scope.items[$stateParams.itemId];
    console.log($scope.item);
  });

  $scope.itemId = $stateParams.itemId;

  $rootScope.showSubMenu = false;

  $scope.nextStatus = function(id, status) {
    rtItems.nextStatus(id, status);
  }

  $scope.deleteItem = function(id) {
    console.log(id);
    $scope.items.$key(id).$remove().then(function() {
      console.log('item deleted');
      
    });
    //$scope.items.$key(id).$remove();
  }
	

});


