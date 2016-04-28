'use strict';

angular.module('minitw')

.controller('ProfileCtrl', function ($scope, $http, $location, $rootScope ) {
	if(!$rootScope.user){
		$location.path('/login');
	}


	var serverurl = 'http://localhost:7000/follow';
	


	$scope.getFollowing = function (){
		if($rootScope.user){
			$http.get(serverurl+'/following/'+$rootScope.user.email)
			.success(function (response){
				$scope.following = response;
			});			
		}else{
			$location.path('/login');
		}

	}
	
	$scope.getFollowing();

	$scope.follow = function (){
		var relation = {
			followerEmail:$rootScope.user.email,
			followedEmail:$scope.emailToFollow
		}

		$http.get('http://localhost:7000/users/'+$scope.emailToFollow)
		.then(function (response){
			$http.post(serverurl, relation)
			.success(function (response){
				$scope.message = response;
				$scope.getFollowing();
			});	
		}, function (response){
			$scope.error = 'User not found'
		});
		

	}

	$scope.unfollow = function (emailToUnfollow){
		// var newReq = {
		// 	method:'DELETE',
		// 	url:serverurl,
		// 	data: {
		// 		followerEmail:victim.followerEmail,
		// 		followedEmail:victim.followedEmail
		// 	}
		// }
		var victim = {
			followedEmail:emailToUnfollow,
			followerEmail:$rootScope.user.email
		}
		$http.put(serverurl, victim)
		.then(function (response){
			$scope.getFollowing();
		}, function (response){
			console.error(response.data);
		});
	}

	$scope.getFollowers = function (){

	};

		
});