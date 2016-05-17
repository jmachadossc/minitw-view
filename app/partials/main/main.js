'use strict';



angular.module('minitw')


.controller('MainCtrl', ['$scope', '$location', '$http', '$rootScope', 'FollowService', 'TweetService',
  function($scope, $location, $http, $rootScope, FollowService, TweetService) {


    function MainCtrl() {
      this.baseUrl = 'http://localhost:7000/users/';
      this.init.bind(this);
      this.init();
    }

    MainCtrl.prototype.init = function() {
      if (!$rootScope.user) {
        return $location.path('/login');
      }
      $scope.getAllTweets = this.getAllTweets.bind(this);
      $scope.unfollow = this.unfollow.bind(this);
      $scope.sendTweet = this.sendTweet.bind(this);
      $scope.deleteTweet = this.deleteTweet.bind(this);
      $scope.changeFavourite = this.changeFavourite.bind(this);
      this.refreshFollowers.bind(this);
      this.refreshFollowers();
      $scope.featuredTweet = {
          content: 'There is no featured tweet yet',
          submitter: 'Featured'
      };
    };

    MainCtrl.prototype.getBaseUrl = function() {
      return this.baseUrl + $rootScope.user.email;
    };

    /**
     * Handles the retrieved following data  
     */
    MainCtrl.prototype.onFollowingData = function (response) { 
      if (response) {
        $scope.following = response.data;
        $scope.getAllTweets();

      } else {
        $scope.error = 'Not following anyone';
      }   
    };

    MainCtrl.prototype.refreshFollowers = function() {
      FollowService.getFollowing($rootScope.user).then(this.onFollowingData);
    };


    MainCtrl.prototype.getAllTweets = function() {
      TweetService.getAllTweets($scope.user).then(function(response) {
          console.log('tweets %o', response);
          $scope.tweets = response.data;
        });
    };

    MainCtrl.prototype.unfollow = function(email) {
      FollowService.unfollow($scope.user, email).then(this.refreshFollowers.bind(this));
    };

    MainCtrl.prototype.changeFavourite = function (tweet) {
      $scope.featuredTweet = tweet;
    };

    MainCtrl.prototype.sendTweet = function() {
      var newTweet = {
        content: $scope.newTweet,
        submitter: $scope.user.email
      };
      TweetService.sendTweet($scope.user, newTweet).then(this.getAllTweets);
    };


    MainCtrl.prototype.deleteTweet = function(tweet) {
      TweetService.deleteTweet($scope.user, tweet).then(this.getAllTweets);
    };

    new MainCtrl();
  }
]);