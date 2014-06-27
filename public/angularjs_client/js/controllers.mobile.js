var cleanCardMobileControllers = angular.module('cleanCardMobileControllers', ['ngTouch']);

//Starting fresh with mobile after discovering I was putting too much into controllers
//Moving ui-independent logic to services per angular docs
//This will become the desktop apps boards controller as well in the future

cleanCardMobileControllers.controller('BoardsCtrl', function($rootScope, $scope, $stateParams, rtCategories, rtItems) {


	//$scope.cats = rtCategories.query();


	console.log($scope.cats);

  $scope.items = rtItems.all();

  $rootScope.showSubMenu = true;

  //Filter board depending on button
  $scope.filteredStatus = $stateParams.status;


  $scope.addItem = function() {
  	$scope.item.status = 'planned';
  	rtItems.create($scope.item).then(function() {
  		$scope.item.name = '';
  	});
  }


  $scope.nextStatus = function(id, status) {
    rtItems.nextStatus(id, status);
  }


});


cleanCardMobileControllers.controller('ItemMobileCtrl', function($scope, $stateParams, rtItems) {

  $scope.item = rtItems.get($stateParams.itemId);
	

});


