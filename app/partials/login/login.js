'use strict';

angular.module('minitw')


.controller('LoginCtrl',['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
	function LoginCtrl(){
		$scope.login = this.login;
	  	$scope.uemail = 'lalo@hotmail.com';
	}

	LoginCtrl.prototype.login= function(){
		var serverurl = 'http://localhost:7000/users/';
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
  	new LoginCtrl();
  	
}]);

