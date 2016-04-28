'use strict';

angular.module('minitw')

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/main', {
//     templateUrl: 'mainv/main.html',
//     controller: 'MainCtrl'
//   }).otherwise({redirectTo: '/login'});
// }])

.controller('MainCtrl', function($scope, $http, $location, $rootScope ) {
	var serverurl = 'http://localhost:7000/tweets/';
	$scope.getTweets = function(){
		$http.get(serverurl)
		.success(function (response) {
    		$scope.tweets = response;
    		if($rootScope.user){
  				$location.path('/main');
  			} 
    });
    
  };
	$scope.sendTweet = function(){
		if($scope.user){
  		var newTweet = {
  			content: $scope.newTweet,
  			submitter: $scope.user.email
  		};  			
		}else{
			return console.error('Undefined user');
		}

		if(newTweet.content && newTweet.submitter){
  		$http.post(serverurl, newTweet)
  		.success(function (response){
  			$scope.getTweets();
  		});
		}
	}; 
	$scope.getTweets();
	if(!$rootScope.user){
		$location.path('/login');
	}
  $scope.deleteTweet = function(tweet){
    if(tweet._id){
      if($scope.user.email===tweet.submitter){
        $http.delete(serverurl + tweet._id )
        .success(function (response){
          $scope.getTweets();
        });  
      }else{
        $scope.error='Cannot delete that'
      }
        
    }else{
      return console.error('Tweet is undefined'); 
    }
      
    
  }
});