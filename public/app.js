var cleanCard = angular.module('cleanCard', ['ui.router', 'cleanCardControllers', 'cleanCardServices']);


cleanCard.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/backlog');

	$stateProvider
		.state('backlog', {
			url: '/backlog',
			views: {
				'navbar-content': { templateUrl: 'nav-backlog.html' },
				'main': { templateUrl: 'backlog.html' }
			},
			controller: 'cleanCardCtrl'
		})
		.state('board', {
			url: '/board',
			views: {
				'navbar-content': { templateUrl: 'nav-board.html' },
				'main': { templateUrl: 'board.html' }
			}
		})

});