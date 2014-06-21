var cleanCard = angular.module('cleanCard', [
	'ngRoute',
	'ui.router',
	'cleanCardControllers',
	'cleanCardMobileControllers',
	'cleanCardServices'
]);

cleanCard.run(function($rootScope, Category) {

	//Categories (mobile and desktop)
  var selectAllCategories = function() {
    angular.forEach($rootScope.categories, function(category) {
        category.selected = true;
    });
    $rootScope.$broadcast('MyEvent');
    //backlogFilter();
  }	

  $rootScope.categories = Category.query(function(response) {
    selectAllCategories()
  });

  //Modal filter (mobile only)
	$rootScope.showModal = false;

  $rootScope.toggleModal = function() {
    console.log("toggle modal");
    $rootScope.showModal = !$rootScope.showModal;

  }

  $rootScope.filterMobile = function() {
    console.log("filter mobile called");
    $rootScope.$broadcast('MyEvent');
    //filterBacklog();
  }


});


cleanCard.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/backlog');

	//cleanCardCtrl is binded to <body> (was, but not anymore)
	$stateProvider
		.state('backlog', {
			url: '/backlog',
			views: {
				'navbar-content': { templateUrl: 'angularjs_client/templates_mobile/nav-backlog.html' },
				'main': {
					templateUrl: 'angularjs_client/templates_mobile/backlog.html',
					controller: 'BoardsCtrl'
				}
			}
		})
		.state('items', {
			url: '/items?status',
			views: {
				'navbar-content': { templateUrl: 'angularjs_client/templates_mobile/nav-board.html' },
				'main': {
					templateUrl: 'angularjs_client/templates_mobile/board.html',
					controller: 'BoardsCtrl'
				}
			}
		})
		.state('item', {
			url: '/items/:itemId',
			views: {
				'navbar-content': { templateUrl: 'angularjs_client/templates_mobile/nav-item.html' },
				'main': { 
					templateUrl: 'angularjs_client/templates_mobile/item.html',
					controller: 'itemCtrl'
				}
			}
		})		
		.state('login', {
			url: '/sessions/new',
			views: {
				'navbar-content': { templateUrl: 'angularjs_client/templates_mobile/nav-backlog.html' },
				'main': {
					templateUrl: 'angularjs_client/templates_mobile/login.html',
					controller: 'sessionsCtrl'
				}
			}
		})

});