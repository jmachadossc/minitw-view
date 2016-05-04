'use strict';



angular.module('minitw')

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/main', {
//     templateUrl: 'mainv/main.html',
//     controller: 'MainCtrl'
//   }).otherwise({redirectTo: '/login'});
// }])

.controller('MainCtrl',['$scope','$location','$http', '$rootScope', 'FollowService',
 function ($scope, $location, $http, $rootScope, FollowService) {
    function getFollowingCb(response){

    if(response){
      $scope.following = response;
      $scope.getTweets();
    }else{
      $scope.getTweets();
      $scope.error = 'Not following anyone';
    }
  }

  function refreshFollowers(){
    FollowService.getFollowing($rootScope.user, getFollowingCb);
  }
  if($rootScope.user){
    var serverurl = 'http://localhost:7000/users/' + $rootScope.user.email +'/tweets/' ;
    
    $scope.getTweets = function(){
      var config = {
        method: 'GET',
        url: serverurl + 'following'
      }
      $http(config)
      .success(function (response) {
        console.log(response , 'this should display tweets');
        if(response){
          $scope.tweets = response;
          for (var i=0; i<response.length; i++){
              response[i].date = new Date(response[i].date);
          }
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


    refreshFollowers();
      
  }else{
    $location.path('/login');
  } 
	

}]);