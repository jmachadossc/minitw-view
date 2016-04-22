var minitw = angular.module('minitw');

minitw.controller('UserCtrl', function ($scope, $http) {
	var serverurl = 'http://localhost:7000/users/';
	$scope.login = function(){
		// console.log("$scope.uemail",$scope.uemail);
		$http.get(serverurl + $scope.uemail)
		.success(function(data) {
    		$scope.user = data; 
    	});
  	};
  	if($scope.user){
  		// $ngRoute.redirectTo('/login');
  	}
});










