var cleanCardControllers = angular.module('cleanCardControllers', []);

 
cleanCardControllers.controller('cleanCardCtrl', function ($scope, Item) {
  $scope.helloWorld = 'Have no fear, Angular is here';

  $scope.item = Item.get({id: 1});

  console.log($scope.item);

  $scope.items = Item.query();

  console.log($scope.items);




});