var cleanCardControllers = angular.module('cleanCardControllers', []);

 
cleanCardControllers.controller('cleanCardCtrl', function ($scope, $http, $routeParams, Item, Task) {
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
  
    item.status = "backlog";
    item.$update();

  }


  $scope.createItem = function(item) {

    console.log(item);

    var item = new Item(item);
    item.status = "backlog"
    item.linkable_type = "Category"
    
    item.$save(function(response) {
      $scope.items.push(response);
    });

  }


  $scope.expandItem = function(item) {

    item.tasks = Task.query({itemId: item.id});

    item.expand = !item.expand;


  }

  //Tasks controller stuff

  //TODO: create tasks:index to call from expandItem


  //Boards controller stuff

  $scope.showBacklog = true;

  $scope.columnWidth = 'col-md-3';

  $scope.$watch('showBacklog', function() {

    if($scope.showBacklog === true) {
      $scope.columnWidth = 'col-md-3';
      $scope.rightMenuWidth = 'col-md-9';
    }
    else {
      $scope.columnWidth = 'col-md-4';
      $scope.rightMenuWidth = 'col-md-12';     
    }

  });  


});