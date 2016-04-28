'use strict';

angular.module('minitw')


.controller('LoginCtrl', function ($scope, $http, $location, $rootScope) {
	var serverurl = 'http://localhost:7000/users/';
	$scope.login = function(){
		// console.log("$scope.uemail",$scope.uemail);
		$http.get(serverurl + $scope.uemail)
		.then(function (response) {
			if(response.status==200){
				$rootScope.user = response.data;
				$location.path('/main');
			}
    	}, function (response){
    		$scope.error = response.data;
    		console.error(response.data);
    	});
  	};
  	
});

