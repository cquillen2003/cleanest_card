var cleanCard = angular.module('cleanCard', [
	'ngRoute',
	'ui.router',
	'cleanCardControllers',
	'cleanCardMobileControllers',
	'cleanCardServices',
	'cleanCardFilters',
	'goangular'
]);


cleanCard.run(function($rootScope, CategoryService) {

	//Category filter selection set on $rootScope to persist through navigation
	//Tried putting this in CategoryService but it was messy

	$rootScope.setSelectedCategoryIds = function() {
		$rootScope.selectedCategoryIds = [];

	    angular.forEach($rootScope.categories, function(category) {
	      if (category.selected) {
	      	$rootScope.selectedCategoryIds.push(category.id);
	      }
	    });
	    console.log($rootScope.selectedCategoryIds);		
	}

	CategoryService.getCategories().then(function(categories) {
		$rootScope.categories = categories;
		
		//Show all current user's categories by default
		angular.forEach($rootScope.categories, function(category) {
			category.selected = true;
		});
		$rootScope.setSelectedCategoryIds();
	});

	$rootScope.expandAllText = 'Expand All';

});


cleanCard.config(function($stateProvider, $urlRouterProvider, $goConnectionProvider) {

	//Authenticate user with GoInstant
	$goConnectionProvider.$set('https://goinstant.net/76134da4b781/my-application');

	console.log(document.cookie);

	//https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
	var goinstantToken = document.cookie.replace(/(?:(?:^|.*;\s*)goinstant_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

	console.log(goinstantToken);

	var url = 'https://goinstant.net/76134da4b781/my-application'

	var opts = {
		user: goinstantToken
	}

	goinstant.connect(url, opts, function(err, conn, room) {
		if (err) {
			throw err;
			console.log("goinstant connect error");
		}
		console.log("goinstant connect with rails generated token succeeded!");
	})


	//Routes
	$urlRouterProvider.otherwise('/backlog');

	//cleanCardCtrl is binded to <body> (was, but not anymore)
	$stateProvider
		.state('items', {
			abstract: true, //An 'abstract' state is simply a state that can't be transitioned to.
			url: '/items',
			// Note: abstract still needs a ui-view for its children to populate.
        	// You can simply add it inline here.
			template: '<ui-view />'
		})

		.state('items.backlog', {
			url: '/backlog',
			templateUrl: 'angularjs_client/templates_mobile/backlog.html',
			controller: 'BoardsCtrl'
		})

		.state('items.view', {
			url: '/{itemId:[0-9]{1,8}}', // will only match a contactId of one to eight number characters
			templateUrl: 'angularjs_client/templates_mobile/item.html',
			controller: 'ItemMobileCtrl'		

		})

		.state('items.board', {
			url: '/:status',
			templateUrl: 'angularjs_client/templates_mobile/board.html',
			controller: 'BoardsCtrl'
		})		

		.state('login', {
			url: '/sessions/new',
			templateUrl: 'angularjs_client/templates_mobile/login.html',
			controller: 'sessionsCtrl'
		})

});