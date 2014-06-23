var cleanCardMobileControllers = angular.module('cleanCardMobileControllers', ['ngTouch']);

//Starting fresh with mobile after discovering I was putting too much into controllers
//Moving ui-independent logic to services per angular docs
//This will become the desktop apps boards controller as well in the future

cleanCardMobileControllers.controller('BoardsCtrl', function ($rootScope, $scope, $stateParams, rtCategories, rtItems) {


	$scope.cats = rtCategories.query();


	console.log($scope.cats);

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


  $scope.next = function(id, status) {
  	//Create attr object for update
  	var attr;

  	if (status === 'planned') {
  		attr = {status: 'started'};
  	}
  	else if (status === 'started') {
  		attr = {status: 'done'};
  	}
  	else {
  		attr = {};
  	}
	rtItems.update(id, attr);
  }


});





