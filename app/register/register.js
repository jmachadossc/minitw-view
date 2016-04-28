'use-strict'

angular.module('minitw')

.controller('RegisterCtrl', function ($scope, $http, $location, $rootScope){
	var serverurl = 'http://localhost:7000/users/';
	$scope.register = function(){
		$http.post(serverurl, $scope.user)
		.then(function (response) {
			if(response.status==200){
				$rootScope.user = $scope.user;
				$location.path('/main');
			}
    	}, function (response){
    		$scope.error = response.data;
    		console.error(response.data);
    	});
	}
})