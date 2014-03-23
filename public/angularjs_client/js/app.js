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
      when('/boards/plan', {
        templateUrl: 'angularjs_client/templates/current.html',
        controller: 'cleanCardCtrl'
      }).
      when('/boards/current', {
        templateUrl: 'angularjs_client/templates/current.html',
        controller: 'cleanCardCtrl'
      }).            
      otherwise({
        redirectTo: '/phones'
      });
  }
])
.run(function($rootScope) {

//Way to set $rootScope variables on every page request
//Found technique online in post from Igor, while researching
//how to handle layouts/common page elements like header, footer
//https://groups.google.com/forum/#!topic/angular/ddjJ4WOmwSw

  $rootScope.showBacklog = true;

  $rootScope.rootFunction = function() {
    console.log("clicked mother fucker");
    $rootScope.showBacklog = !$rootScope.showBacklog;
  }


});