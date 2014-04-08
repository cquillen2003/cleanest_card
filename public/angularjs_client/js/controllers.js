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

  $scope.allTasks = Item.query({type: 'task'});

  $scope.allProjectTasks = Item.query({type: 'projecttask'});

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

  }

  $scope.expandAll = false;

  $scope.filterBoard = function() {

    $scope.expandAll = !$scope.expandAll;

    console.log($scope.expandAll);

    if ($scope.expandAll) {
      $scope.boardItems = $scope.allProjectTasks.concat($scope.allTasks);
    }
    else {
      $scope.boardItems = $scope.allitems;
    }

    
    console.log($scope.boardItems);
  }


  $scope.plan = function(item) {
	
  	item.status = "planned";
  	item.$update();

    var tasks = Task.query({itemId: item.id}, function(response) {

      console.log("plan function fired, tasks next");
      console.log(tasks);

      angular.forEach(tasks, function(task, key) {
        console.log("individual task");
        console.log(task);
        task.status = 'planned';
        task.$update({itemId: task.linkable_id, id: task.id});
      });


    });


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

  $scope.deleteItem = function(item) {

    var index = $scope.items.indexOf(item);

    item.$remove(function() {
      $scope.items.splice(index, 1);
    });
    
  }

  //Tasks controller stuff

  //TODO: create tasks:index to call from expandItem

  $scope.selectItemsAsTasks = function(item) {
    item.showAddItemsButton = true;

    $scope.showItemSelectBoxes = true;

  }

  $scope.convertItems = function(item) {

    //TODO: hide checkbox for this item (need variable to be on item scope)

    var parentItemId = item.id;

    var selectedItems = $filter('filter')($scope.allitems, { selected: true });
    console.log(selectedItems);

    angular.forEach(selectedItems, function(item, key) {
      console.log(item);
      console.log(parentItemId);
      item.linkable_type = 'Item';
      item.linkable_id = parentItemId;
      item.$update();

      var index = $scope.items.indexOf(item);
      $scope.items.splice(index, 1);

    });

    item.showAddItemsButton = false;

  }


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