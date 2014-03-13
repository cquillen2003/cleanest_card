var cleanCardControllers = angular.module('cleanCardControllers', []);

 
cleanCardControllers.controller('cleanCardCtrl', function ($scope, ItemService) {
  $scope.helloWorld = 'Have no fear, Angular is here';

  $scope.item = ItemService.get(1);

  console.log($scope.item);


});