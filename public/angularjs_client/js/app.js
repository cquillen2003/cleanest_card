var cleanCard = angular.module('cleanCard', ['ngRoute', 'ui.router', 'cleanCardControllers', 'cleanCardServices']);


cleanCard.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/sessions/new');

  $stateProvider
    .state('board', {
      url: '/board',
      templateUrl: 'angularjs_client/templates/current.html',
      controller: 'cleanCardCtrl'
    })
    .state('login', {
      url: '/sessions/new',
      templateUrl: 'angularjs_client/templates/sessions-new.html',
      controller: 'cleanCardCtrl'
    })

});



