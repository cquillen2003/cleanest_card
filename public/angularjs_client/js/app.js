var cleanCard = angular.module('cleanCard', ['ngRoute', 'cleanCardControllers', 'cleanCardServices']);


cleanCard.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/sessions/new', {
      	templateUrl: 'sessions/new.html',
      	controller: 'ItemsCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
}]);