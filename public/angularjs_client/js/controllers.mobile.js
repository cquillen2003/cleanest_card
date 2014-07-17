var cleanCardMobileControllers = angular.module('cleanCardMobileControllers', ['ngTouch']);

//Starting fresh with mobile after discovering I was putting too much into controllers
//Moving ui-independent logic to services per angular docs
//This will become the desktop apps boards controller as well in the future

cleanCardMobileControllers.controller('BoardsCtrl', function($rootScope, $scope, $stateParams, ItemService, itemFilter) {

  //Header/Navigation controls (may move to separate controller and parent view eventually)

  $scope.toggleModal = function() {
    console.log("toggle modal from local scope");
    $scope.showModal = !$scope.showModal;
  }

  $scope.selectCategories = function() {
    $rootScope.setSelectedCategoryIds();
    loadItems();
  }

  $scope.toggleExpandAll = function() {
    $rootScope.expandAll = !$rootScope.expandAll;

    if ($rootScope.expandAll) {
      $rootScope.expandAllText = 'Collapse All';
    }
    else {
      $rootScope.expandAllText = 'Expand All';
    }

    loadItems();
  }


	function loadItems() {
    ItemService.getItems().then(function(items) {
      $scope.items = itemFilter(items, $rootScope.selectedCategoryIds, $rootScope.expandAll);
    });
  }

  //$scope.$on('items:added', loadItems); //TODO: Remove then() calls from service
  $scope.$on('items:updated', loadItems);
  $scope.$on('project:planned', loadItems);

  loadItems();

  $scope.nextStatus = ItemService.calculateNextStatus($stateParams.status);

  //Filter board depending on button
  $scope.filteredStatus = $stateParams.status;


  $scope.addItem = function() {
  	$scope.item.status = 'backlog';
    $scope.item.linkable_type = 'Category';
    $scope.item.linkable_id = 2;

    ItemService.addItem($scope.item).then(function(item) {
      loadItems();
    });
  }

  $scope.updateItem = function(item, attr) {
    ItemService.updateItem(item, attr);
  }

  $scope.planItem = function(item) {
    if (item.items_count > 0) {
      ItemService.planProject(item);
    }
    else {
      var attr = {status: 'planned'}
      ItemService.updateItem(item, attr);
    }
  }

  $scope.swipeItemLeft = function(item) {
    if (item.items_count === 0 & item.status !== 'done') {
      item.showActions = true;
    }
  }

  $scope.swipeItemRight = function(item) {
    item.showActions = false;
  }


});


cleanCardMobileControllers.controller('ItemMobileCtrl', function($rootScope, $scope, $stateParams, $state, ItemService, TaskService) {

  //$scope.item = ItemService.find($stateParams.itemId);
  function loadItem() {
    ItemService.getItem($stateParams.itemId).then(function(item) {
      item.getList('items').then(function(tasks) {
        $scope.item = item;
        $scope.item.tasks = tasks;
        $scope.nextStatus = ItemService.calculateNextStatus($scope.item.status);
        console.log($scope.item);
      });
    });
  }

  $scope.$on('project:planned', loadItem);
  $scope.$on('tasks:added', loadItem);

  loadItem();

  $rootScope.showSubMenu = false;
  $scope.taskFilter = 'planned';
  $scope.nextTaskStatus = 'started';

  $scope.updateItem = function(item, attr) {
    ItemService.updateItem(item, attr).then(function(item) {
      console.log('do anything?');
    });
  }

  $scope.deleteItem = function(item) {
    ItemService.removeItem(item).then(function(item) {
      //Then method also called in service
      $state.go('items',{status: 'planned'} );
    });
  }

  $scope.planProject = function(item) {
    console.log('planProject()');
    ItemService.planProject(item);
  }

  $scope.addTask = function() {
    $scope.task.status = 'planned';
    TaskService.addTask($scope.item, $scope.task).then(function(task) {
      $scope.task.name = '';
    });
  }

  $scope.filterTasks = function(initialStatus) {
    $scope.taskFilter = initialStatus;
    $scope.nextTaskStatus = ItemService.calculateNextStatus(initialStatus);
  }

});


cleanCardMobileControllers.controller('NewItemCtrl', function($rootScope, $scope, $stateParams, $state, ItemService, TaskService) {

  $scope.item = {};
  $scope.tasks = [];

  $scope.addTask = function() {
    $scope.task.status = 'planned';
    $scope.tasks.push($scope.task);
    $scope.task = {};
    console.log($scope.tasks);
  }

  $scope.addItem = function() {
    $scope.item.status = 'backlog';
    $scope.item.linkable_type = 'Category';
    $scope.item.linkable_id = 2;

    ItemService.addItem($scope.item).then(function(item) {
      if ($scope.tasks.length > 0) {
        angular.forEach($scope.tasks, function(task, key) {
          TaskService.addTask(item, task).then(function(task) {
            if (key === ($scope.tasks.length - 1)) {
              $state.go('items.backlog');
            }
          });
        });
      }
      else {
        $state.go('items.backlog');
      }
    });
  }

});


