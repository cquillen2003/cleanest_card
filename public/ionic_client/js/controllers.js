angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Item) {

  $scope.allItemsAndTasks = Item.query(function(response) {
 
  });

})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
