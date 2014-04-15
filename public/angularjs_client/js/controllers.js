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

  $scope.allItemsAndTasks = Item.query(function(response) {
      filterBoard();
  });

  $scope.allItems = Item.query({type: 'item'});

  //$scope.allTasks = Item.query({type: 'task'});
  
  //$scope.backlogItems = $scope.allItems;

  $scope.filterBacklog = function() {

    console.log("filter backlog function fired");

    $scope.backlogItems = $filter('filter')($scope.allItems,
        function(item) {
          var match = false;    
          angular.forEach($scope.categories, function(category, key) {
            console.log(item.name);
            console.log(item.linkable_id);
            if (item.item_type !== 'Task' && item.linkable_id === category.id && category.selected) {
              console.log("return true");
              match = true;
            }
          });
        console.log("return false");
        return match;
        }

    );

  }

  /*

  console.log($scope.items);

  $scope.backlogFilterFunction = function(item) {

    console.log("backlog filter function fired");

    var match = false;    
      angular.forEach($scope.categories, function(category, key) {
        //console.log(item.name);
        //console.log(item.linkable_id);
        if (item.item_type !== 'Task' && item.linkable_id === category.id && category.selected) {
          //console.log("return true");
          match = true;
        }
      });
    //console.log("return false");
    return match;
  }
  */

  $scope.expandAll = false;

  $scope.toggleExpandAll = function() {
    $scope.expandAll = !$scope.expandAll;
    filterBoard();
  }

  var filterBoard = function() {

    console.log($scope.expandAll);

    $scope.items = $filter('filter')($scope.allItemsAndTasks, function(item) {
      if ($scope.expandAll) {
        if (item.items_count > 0) {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        if (item.linkable_type === 'Category') {
          return true;
        }
        else {
          return false;
        }
      }
    });

    
    console.log($scope.items);
  }

  /*
  $scope.boardFilterFunction = function(item) {

    console.log("board filter function fired");
    console.log(item);

      if ($scope.expandAll) {
        if (item.items_count > 0) {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        if (item.linkable_type === 'Category') {
          return true;
        }
        else {
          return false;
        }
      }    
  }
  */


  $scope.plan = function(item) {
	
  	item.status = "planned";
  	item.$update(function(response) {
      $scope.allItemsAndTasks.push(response);
      filterBoard();
    });

    //var tasks = Task.query({itemId: item.id}, function(response) {

      angular.forEach($scope.allItemsAndTasks, function(task, key) {

        if (task.linkable_type === "Item" && task.linkable_id === item.id) {

          task.status = "planned";
          //updateParentStatus();
          task.$update({itemId: item.id, id: task.id}, function(response) {
            $scope.allItemsAndTasks.push(response);
            filterBoard();
          });

        }

      });

    //});


  }

  $scope.backPlanned = function(item) {
  
    item.status = "backlog";
    item.$update();

    angular.forEach($scope.items, function(task, key) {
      if (task.linkable_type === "Item" && task.linkable_id === item.id) {
        task.status = "backlog";
        task.$update({itemId: item.id, id: task.id});
      }
    });

  }


  $scope.createItem = function(card) {

    var item = new Item(card);

    item.status = "backlog"
    item.linkable_type = "Category"
    item.item_type = "Item"
    
    item.$save(function(response) {
      $scope.backlogItems.push(response);
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

  var updateParentStatus = function(parentItem) {

    var backlogTasks = 0;
    var plannedTasks = 0;
    var startedTasks = 0;
    var doneTasks = 0;

    angular.forEach($scope.items, function(item, key) {
      if (item.linkable_type === "Item" && item.linkable_id === parentItem.id) {

        switch(item.status) {
          case "backlog":
            backlogtasks = backlogTasks + 1;
            break;
          case "planned":
            plannedTasks = plannedTasks + 1;
            break;
          case "started":
            startedTasks = startedTasks + 1;
            break;
          case "done":
            doneTasks = doneTasks + 1;
            break;
        }

      }
      console.log("updateParentStatus called here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(plannedTasks);
    });


  }

  //Tasks controller stuff

  $scope.start = function(item) {
    item.status = 'started';
    item.$update();
  }

  $scope.backStart = function(item) {
    item.status = 'planned';
    item.$update();
  }

  $scope.done = function(item) {
    item.status = 'done';
    item.$update();
  }

  $scope.backDone = function(item) {
    item.status = 'started';
    item.$update();
  }

  //TODO: create tasks:index to call from expandItem

  $scope.selectItemsAsTasks = function(item) {
    item.showAddItemsButton = true;

    $scope.showItemSelectBoxes = true;

  }

  $scope.convertItems = function(item) {

    //TODO: hide checkbox for this item (need variable to be on item scope)

    var parentItemId = item.id;

    var selectedItems = $filter('filter')($scope.backlogItems, { selected: true });
    console.log(selectedItems);

    angular.forEach(selectedItems, function(task, key) {
      task.linkable_type = 'Item';
      task.linkable_id = parentItemId;
      task.item_type = 'Task';
      task.$update();

      var index = $scope.backlogItems.indexOf(task);
      $scope.backlogItems.splice(index, 1);

      item.items_count = item.items_count + 1;

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