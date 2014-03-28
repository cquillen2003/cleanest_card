var cleanCardControllers = angular.module('cleanCardControllers', []);

 
cleanCardControllers.controller('cleanCardCtrl', function ($rootScope, $scope, $http, $routeParams, $filter, Item, Task) {

  //Sessions controller stuff

  $scope.create = function() {

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

  $scope.allitems = Item.query();

  $scope.items = $scope.allitems;



  $scope.filterBacklog = function() {

    $scope.items = $filter('filter')($scope.allitems,
        function(item) {
          var match = false;    
          angular.forEach($scope.categories, function(category, key) {
            console.log(item.name);
            console.log(item.linkable_id);
            if (item.linkable_id === category.id && category.selected) {
              console.log("return true");
              match = true;
            }
          });
        console.log("return false");
        return match;
        }

    );

    console.log($scope.items);

    /*
    if ($scope.categoryCheckbox) {
      $scope.items = $filter('filter')($scope.items, {name: "Corey"})
    }
    else {
      $scope.items = $scope.allitems;
    }
    */

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