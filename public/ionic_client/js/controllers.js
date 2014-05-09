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
})


.controller('SessionsCtrl', function($scope, $http) {

  //Sessions controller stuff

  $scope.create = function() {

  	console.log("sessions controller create called");
  	console.log($scope.user);

  	if ($scope.user) {
  		var session = {email: $scope.user.email, password: $scope.user.password};
  	}

  	$http.post('/sessions', session).success(function(){
  		//console.log("success called back!");
      $location.path('/boards/current');
  	}); 	
  }

});
