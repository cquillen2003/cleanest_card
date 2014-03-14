var cleanCardServices = angular.module('cleanCardServices', ['ngResource']);

 
cleanCardServices.factory('Item', function($resource) {
  //Added .json to fix 406 error.  Found solution in comments of Rails Cast #405
  //Belay my last, I now set json as the default in routes.rb per:
  //http://www.dillonbuchanan.com/programming/ruby-on-rails-angularjs-resources/
  return $resource('/items/:id', {id: '@id'}, {update: {method: 'PUT'}});
});
