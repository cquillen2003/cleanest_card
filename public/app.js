var mobileClient = angular.module('mobileClient', ['ui.router']);


mobileClient.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/backlog');

	$stateProvider
		.state('backlog', {
			url: '/backlog',
			views: {
				'navbar-content': { templateUrl: 'nav-backlog.html' },
				'main': { templateUrl: 'backlog.html' }
			}
		})
		.state('board', {
			url: '/board',
			views: {
				'navbar-content': { templateUrl: 'nav-board.html' },
				'main': { templateUrl: 'board.html' }
			}
		})

});