var mobileClient = angular.module('mobileClient', ['ui.router']);


mobileClient.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/main');

	$stateProvider
		.state('main', {
			url: '/main',
			templateUrl: 'nav-view.html'
		})


});