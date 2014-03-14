var cleanCardControllers = angular.module('cleanCardControllers', []);

 
cleanCardControllers.controller('cleanCardCtrl', function ($scope, $http, Item) {
  $scope.helloWorld = 'Have no fear, Angular is here';

  $scope.item = Item.get({id: 1});

  console.log($scope.item);

  $scope.items = Item.query();

  console.log($scope.items);

  //Sessions controller stuff

  $scope.create = function() {

  	console.log("form submitted");

  	if ($scope.user) {
  		var session = {email: $scope.user.email, password: $scope.user.password};
  	}

  	$http.post('/sessions', session).success(function(){
  		console.log("success called back!");
  	});
  	
  }




});