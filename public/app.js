var cleanCard = angular.module('cleanCard', ['ngRoute', 'ui.router', 'cleanCardControllers', 'cleanCardServices']);


cleanCard.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/backlog');

	//cleanCardCtrl is binded to <body>
	$stateProvider
		.state('backlog', {
			url: '/backlog',
			views: {
				'navbar-content': { templateUrl: 'nav-backlog.html' },
				'main': {
					templateUrl: 'backlog.html',
					controller: 'cleanCardCtrl'
				}
			}
		})
		.state('items', {
			url: '/items?status',
			views: {
				'navbar-content': { templateUrl: 'nav-board.html' },
				'main': {
					templateUrl: 'board.html',
					controller: 'cleanCardCtrl'
				}
			}
		})
		.state('item', {
			url: '/items/:itemId',
			views: {
				'navbar-content': { templateUrl: 'nav-item.html' },
				'main': { 
					templateUrl: 'item.html',
					controller: 'itemCtrl'
				}
			}
		})		
		.state('login', {
			url: '/sessions/new',
			views: {
				'navbar-content': { templateUrl: 'nav-backlog.html' },
				'main': {
					templateUrl: 'login.html',
					controller: 'sessionsCtrl'
				}
			}
		})

});