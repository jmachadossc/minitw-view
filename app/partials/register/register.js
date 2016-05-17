'use-strict';

angular.module('minitw')

.controller('RegisterCtrl', ['$scope', '$http', '$location', '$rootScope',function ($scope, $http, $location, $rootScope){
	function RegisterCtrl(){
		$scope.register = this.register;
	}
	RegisterCtrl.prototype.register = function(){
		var serverurl = 'http://localhost:7000/users/';
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
	};
	new RegisterCtrl();
}]);