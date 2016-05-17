'use strict';

angular.module('minitw')

.controller('ProfileCtrl',['$scope','$location', '$rootScope', 'FollowService',
	function ($scope, $location, $rootScope, FollowService) {

		function ProfileCtrl(){
			this.init.bind(this);
			this.init();
		}

		ProfileCtrl.prototype.init = function(){
			if($rootScope.user){				
				this.refreshFollowers();
			}else{
				$location.path('/login');
			}
			$scope.follow = this.follow.bind(this);
			$scope.unfollow = this.unfollow.bind(this);
				
		};

		ProfileCtrl.prototype.onFollowingData = function(response){
			if(!response.data){
				$scope.error = 'Not following anyone';
			}else{
				$scope.following = response.data;
			}
		};

		ProfileCtrl.prototype.refreshFollowers = function(){
			FollowService.getFollowing($rootScope.user).then(this.onFollowingData);
		};

		ProfileCtrl.prototype.follow = function(){
			FollowService.follow($rootScope.user, $scope.emailToFollow).then(this.refreshFollowers.bind(this));
		};

		ProfileCtrl.prototype.unfollow = function(emailToUnfollow){
			FollowService.unfollow($scope.user, emailToUnfollow).then(this.refreshFollowers.bind(this));
		};

		new ProfileCtrl();
}]);

