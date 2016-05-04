'use strict';

angular.module('minitw')

.controller('ProfileCtrl',['$scope','$location', '$rootScope', 'FollowService',
	function ($scope, $location, $rootScope, FollowService) {
		function getFollowingCb(data){
			if(!data){
				$scope.ferror = 'Not following anyone';
			}else{
				$scope.following = data;
			}
		}

		function refresh(){
			FollowService.getFollowing($rootScope.user, getFollowingCb);
		}
		if($rootScope.user){
			$scope.follow = function(){
				FollowService.follow($rootScope.user, $scope.emailToFollow,refresh);
			}	
			refresh();
			
		}else{
			$location.path('/login');
		}

		
}]);

