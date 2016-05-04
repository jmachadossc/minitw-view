'use-strict';

angular.module('minitw')


.factory('FollowService', ['$http','$q',function ($http, $q){

		var serverurl = 'http://localhost:7000/users/';
	
		function getFollowing(loggedUser, cb){
			if(loggedUser){
				$http.get(serverurl+ loggedUser.email + '/following')
				.success(cb);		
			}else{
				cb();
			}

		}
		

		function follow(loggedUser,emailToFollow, cb){
			if(loggedUser.email && emailToFollow){
				$http.post(serverurl + loggedUser.email + '/following/' + emailToFollow)
				.success(cb);	
			}else{
				cb();
			}
						
			
		}	
			

		// }

		// $scope.unfollow = function (emailToUnfollow){
		// 	// var newReq = {
		// 	// 	method:'DELETE',
		// 	// 	url:serverurl,
		// 	// 	data: {
		// 	// 		followerEmail:victim.followerEmail,
		// 	// 		followedEmail:victim.followedEmail
		// 	// 	}
		// 	// }
		// 	var victim = {
		// 		followedEmail:emailToUnfollow,
		// 		followerEmail:$rootScope.user.email
		// 	}
		// 	$http.put(serverurl, victim)
		// 	.then(function (response){
		// 		$scope.getFollowing();
		// 	}, function (response){
		// 		console.error(response.data);
		// 	});
		// }

		// $scope.getFollowers = function (){

		// };
	return {
		getFollowing:getFollowing,
		follow:follow 
		// unfollow:unfollow,
		// getFollowers:getFollowers
	};
}]);