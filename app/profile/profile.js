'use strict';

angular.module('minitw')

.controller('ProfileCtrl',['$scope','$location', '$rootScope', 'FollowService',
	function ($scope, $location, $rootScope, FollowService) {
		if($rootScope.user){
			function getFollowingCb(data){
				if(!data){
					$location.path('/login');
				}else{
					$scope.following = data;
				}
			}

			function refresh(){
				FollowService.getFollowing($rootScope.user, getFollowingCb);
			}	

			$scope.follow = function(){
				FollowService.follow($rootScope.user, $scope.emailToFollow,refresh);
			}	
			refresh();
			
		}else{
			$location.path('/login');
		}

		
}]);

