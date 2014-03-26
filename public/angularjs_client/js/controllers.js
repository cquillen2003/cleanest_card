var cleanCardControllers = angular.module('cleanCardControllers', []);

 
cleanCardControllers.controller('cleanCardCtrl', function ($rootScope, $scope, $http, $routeParams, Item, Task) {

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

  //Navbar stuff

  $scope.showBacklog = true;

  $scope.rootFunction = function() {
    $scope.showBacklog = !$scope.showBacklog;
  }

  $scope.categoryFiltering = true;


  //Items controller stuff

  $scope.items = Item.query();

  console.log($scope.items);

  $scope.filterBacklog = function() {
    console.log("filter changed");
    console.log($scope.categoryCheckbox);
  }


  $scope.plan = function(item) {
	
  	item.status = "planned";
  	item.$update();

  }

  $scope.move = function(item) {
  
    item.status = "backlog";
    item.$update();

  }


  $scope.createItem = function(card) {

    var item = new Item(card);

    item.status = "backlog"
    item.linkable_type = "Category"
    
    item.$save(function(response) {
      $scope.items.push(response);
    });

    card.name = ''; //Clear form field
                    //This took forever to figure out because $scope.card is not defined
                    //because the ng-if creates a new child scope

  }


  $scope.expandItem = function(item) {

    item.tasks = Task.query({itemId: item.id});

    item.expand = !item.expand;


  }

  //Tasks controller stuff

  //TODO: create tasks:index to call from expandItem


  //Boards controller stuff
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


  $scope.categories = [
    {id: 1, name: "Personal"},
    {id: 2, name: "Streamline"}
  ]


});