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
      when('/test', {
        templateUrl: 'angularjs_client/templates/test-page.html',
        controller: 'cleanCardCtrl'
      }).      
      when('/sessions/new', {
      	templateUrl: 'angularjs_client/templates/sessions-new.html',
      	controller: 'cleanCardCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
}]);