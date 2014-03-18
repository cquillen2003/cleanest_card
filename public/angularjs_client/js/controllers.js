var cleanCardControllers = angular.module('cleanCardControllers', []);

 
cleanCardControllers.controller('cleanCardCtrl', function ($scope, $http, Item) {
  $scope.helloWorld = 'Have no fear, Angular is here';

  //$scope.item = Item.get({id: 1});

  $scope.items = Item.query();

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

  //Items controller stuff

  $scope.update = function(item) {
  	console.log("update clicked");
	
  	//item.status = "started";
  	console.log(item);
  	item.status = "started";
  	item.$update();

  }

  $scope.move = function(item) {
  
    item.status = "planned";
    item.$update();

  }


  $scope.createItem = function() {

    console.log($scope.item);

    var item = new Item($scope.item);
    item.status = "planned"
    
    item.$save(function(response) {
      $scope.items.push(response);
    });

  }



});