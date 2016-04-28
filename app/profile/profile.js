'use strict';

angular.module('minitw')

.controller('ProfileCtrl', function ($scope, $http, $location, $rootScope ) {
	var serverurl = 'http://localhost:7000/follow';
	var user = $rootScope.user;

	$scope.getFollowing = function (){
		$http.get(serverurl+'/following/'+user.email)
		.success(function (response){
			$scope.following = response;
		});
	}
	if(!$rootScope.user){
		$location.path('/login');
	}

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

	$scope.unfollow = function (victim){
		var newReq = {
			method:'DELETE',
			url:serverurl,
			data: victim
		}
		$http(newReq)
		.then(function (response){
			$scope.getFollowing();
		}, function (response){
			console.error(response.error);
		});
	}

	$scope.getFollowers = function (){

	};

	$scope.getFollowing();	
});