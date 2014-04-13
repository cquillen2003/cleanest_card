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

  $scope.allItemsAndTasks = Item.query();

  //$scope.allItems = Item.query({type: 'item'});

  //$scope.allTasks = Item.query({type: 'task'});
  

  /* TO DELETE
  $scope.backlogItems = $scope.allItems;

  $scope.filterBacklog = function() {

    $scope.backlogItems = $filter('filter')($scope.allItems,
        function(item) {
          var match = false;    
          angular.forEach($scope.categories, function(category, key) {
            //console.log(item.name);
            //console.log(item.linkable_id);
            if (item.linkable_id === category.id && category.selected) {
              //console.log("return true");
              match = true;
            }
          });
        //console.log("return false");
        return match;
        }

    );

  }
  */

  $scope.items = $scope.allItemsAndTasks;

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


  $scope.expandAll = false;

  /* TO DELETE
  $scope.boardItems = $scope.allItems;

  $scope.filterBoard = function() {

    $scope.expandAll = !$scope.expandAll;

    console.log($scope.expandAll);

    $scope.boardItems = $filter('filter')($scope.allItemsAndTasks, function(item) {
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

    
    console.log($scope.boardItems);
  }
  */

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


  $scope.plan = function(item) {
	
  	item.status = "planned";
  	item.$update();

    //var tasks = Task.query({itemId: item.id}, function(response) {

      angular.forEach($scope.items, function(task, key) {

        if (task.linkable_type === "Item" && task.linkable_id === item.id) {

          task.status = "planned";
          task.$update({itemId: item.id, id: task.id}, function(response) {
            console.log("plan individual task success function called!!!!!!!!!!!!!!!!!!!!!!");
          });

        }

      });

    //});


  }

  $scope.move = function(item) {
  
    item.status = "backlog";
    item.$update();

  }


  $scope.createItem = function(card) {

    var item = new Item(card);

    item.status = "backlog"
    item.linkable_type = "Category"
    item.item_type = "Item"
    
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

    var selectedItems = $filter('filter')($scope.items, { selected: true });
    console.log(selectedItems);

    angular.forEach(selectedItems, function(task, key) {
      task.linkable_type = 'Item';
      task.linkable_id = parentItemId;
      task.item_type = 'Task';
      task.$update();

      var index = $scope.items.indexOf(task);
      //$scope.items.splice(index, 1);  //These should be filtered out now, so need to stay in items array

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