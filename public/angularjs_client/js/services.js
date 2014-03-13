var cleanCardServices = angular.module('cleanCardServices', ['ngResource']);

 
cleanCardServices.factory('Item', function($resource) {
  //Added .json to fix 406 error.  Found solution in comments of Rails Cast #405
  return $resource('/items/:id.json', {id: '@id'});
});