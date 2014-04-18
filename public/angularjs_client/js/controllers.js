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

  //$scope.allTasks = Item.query({type: 'task'});
  
  //$scope.backlogItems = $scope.allItems;

  $scope.filterBacklog = function() {
    backlogFilter()
  }

  var backlogFilter = function() {

    //console.log("filter backlog function fired");

    $scope.backlogItems = $filter('filter')($scope.allItemsAndTasks,
        function(item) {

          //console.log(item);

          var match = false;    
          angular.forEach($scope.categories, function(category, key) {
            if (item.item_type !== 'Task' && item.linkable_id === category.id && category.selected) {
              //console.log("return true");
              match = true;
            }
          });
        //console.log("return false");
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

    //console.log("filter board fired");
    //console.log($scope.expandAll);

    $scope.items = $filter('filter')($scope.allItemsAndTasks, function(item) {
      if ($scope.expandAll) {
        //console.log(item);
        if (item.items_count === 0) {
          //console.log("return true");
          return true;
        }
        else {
          //console.log("return false");
          return false;
        }
      }
      else {
        if (item.linkable_type !== 'Item') {
          return true;
        }
        else {
          return false;
        }
      }
    });

    
    //console.log($scope.items);
      console.log("board items");
      console.log($scope.items);
  }

  $scope.allItemsAndTasks = Item.query(function(response) {
      backlogFilter();
      filterBoard();
      console.log("board items");
      console.log($scope.items);
  });

  //$scope.allItems = Item.query({type: 'item'});  

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
      filterBoard();
    });

    //var tasks = Task.query({itemId: item.id}, function(response) {

      angular.forEach($scope.allItemsAndTasks, function(task, key) {

        if (task.linkable_type === "Item" && task.linkable_id === item.id) {

          task.status = "planned";
          task.$update({itemId: item.id, id: task.id}, function(response) {
            updateParentStatus(task);
            filterBoard();
          });

        }

      });

    //});


  }

  $scope.backPlanned = function(item) {
  
    item.status = "backlog";
    item.$update();

    angular.forEach($scope.allItemsAndTasks, function(task, key) {
      if (task.linkable_type === "Item" && task.linkable_id === item.id) {
        task.status = "backlog";
        task.$update({itemId: item.id, id: task.id});
        updateParentStatus(task);
      }
    });

  }


  $scope.createItem = function(card) {

    var item = new Item(card);

    item.status = "backlog"
    item.linkable_type = "Category"
    item.item_type = "Item"
    
    item.$save(function(response) {
      $scope.allItemsAndTasks.push(response);
      backlogFilter();
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

    var index = $scope.allItemsAndTasks.indexOf(item);

    item.$remove(function() {
      $scope.allItemsAndTasks.splice(index, 1);
      backlogFilter();
      filterBoard();
    });

    /*TODO: delete tasks when item is deleted, this if fucking way to hard

    var taskIndices = [];

    angular.forEach($scope.allItemsAndTasks, function(task, key) {
      console.log("task")
      console.log(task);
      if (task.linkable_type === "Item" && task.linkable_id === item.id) {
        console.log("found task to delete!!!!!!");

        var taskIndex = $scope.allItemsAndTasks.indexOf(task);
        taskIndices.push(taskIndex);
        
      }
    });

    console.log("task indices");
    console.log(taskIndices);

    angular.forEach(taskIndices, function(val, key) {
      $scope.allItemsAndTasks.splice(val, 1);
    });
    */

  }

  var findParentItem = function(task) {
    angular.forEach($scope.allItemsAndTasks, function(item, key) {
      if (item.linkable_type !== "Item" && item.id === task.linkable_id) {
        console.log("you found the parent Item!!");
        console.log(item);
        return item;
      }
    })
  }

  var updateParentStatus = function(task) {

    //TODO: I think I need to remove the active record callback on the item model that does this
    //set parentItemId

    var backlogTasks = 0;
    var plannedTasks = 0;
    var startedTasks = 0;
    var doneTasks = 0;

    angular.forEach($scope.allItemsAndTasks, function(item, key) {
      if (item.linkable_type === "Item" && item.linkable_id === task.linkable_id) {

        switch(item.status) {
          case "backlog":
            backlogTasks = backlogTasks + 1;
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
    });

    if (plannedTasks + startedTasks + doneTasks === 0 && backlogTasks > 0) {
      var parentItemStatus = "backlog";
    }
    else if (backlogTasks + startedTasks + doneTasks === 0 && plannedTasks > 0) {
      var parentItemStatus = "planned";
    }
    else if (startedTasks + doneTasks > 0 && plannedTasks + startedTasks > 0) {
      var parentItemStatus = "started";
    }
    else if (backlogTasks + plannedTasks + startedTasks === 0 && doneTasks > 0) {
      var parentItemStatus = "done";
    }
    else {
      console.log("updateParentStatus error");
    }

    angular.forEach($scope.allItemsAndTasks, function(item, key) {
      if (item.linkable_type !== "Item" && item.id === task.linkable_id) {
        item.status = parentItemStatus;
        item.$update(function(response) {
          filterBoard();
        });
      }
    });

  }

  //Tasks controller stuff

  $scope.start = function(item) {
    item.status = 'started';
    item.$update();
    updateParentStatus(item);
    
  }

  $scope.backStart = function(item) {
    item.status = 'planned';
    item.$update();
    updateParentStatus(item);
  }

  $scope.done = function(item) {
    item.status = 'done';
    item.$update();
    updateParentStatus(item);
  }

  $scope.backDone = function(item) {
    item.status = 'started';
    item.$update();
    updateParentStatus(item);
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
      task.$update(function(response) {
        item.items_count = item.items_count + 1;
      });

      var index = $scope.backlogItems.indexOf(task);
      $scope.backlogItems.splice(index, 1);

    });

    item.showAddItemsButton = false;

    console.log("convert items called");
    console.log(item);

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