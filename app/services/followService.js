'use-strict';

angular.module('minitw')


.factory('FollowService', ['$http', function ($http){

		var serverurl = 'http://localhost:7000/users/';

	
		function getFollowing(loggedUser){
			if(loggedUser){
				return $http.get(serverurl+ loggedUser.email + '/following');		
			}else{
				return "Invalid user";
			}

		}
		

		function follow(loggedUser, emailToFollow){
			if(loggedUser.email && emailToFollow){
				return $http.post(serverurl + loggedUser.email + '/following/' + emailToFollow);	
			}else{
				return 'Invalid request';
			}
						
			
		}	
			

		function unfollow(loggedUser, emailToUnfollow){
			if(loggedUser.email && emailToUnfollow){
				var newReq = {
					method:'DELETE',
					url:serverurl+loggedUser.email+'/following/'+emailToUnfollow
				};
				return $http(newReq);
			}else{
				return 'Invalid request';
			}
		}

	return {
		getFollowing:getFollowing,
		follow:follow,
		unfollow:unfollow
		// getFollowers:getFollowers
	};
}]);


