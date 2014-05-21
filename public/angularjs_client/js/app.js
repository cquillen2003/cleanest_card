var cleanCard = angular.module('cleanCard', ['ngRoute', 'ui.router', 'cleanCardControllers', 'cleanCardServices']);


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


});


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



