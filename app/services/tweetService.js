'use-strict';

angular.module('minitw')
.factory('TweetService', ['$http', function ($http){
	var TweetServiceInstance = new TweetService();

	function TweetService(){
	}
	TweetService.prototype.getUrl = function(userEmail){
		return 'http://localhost:7000/users/' + userEmail + '/tweets/';
	};
	
	/**
     * Gets all tweets from the logged user and the users he's following 
     */
	TweetService.prototype.getAllTweets = function(loggedUser){
		if(loggedUser.email){
			var serverurl = this.getUrl(loggedUser.email);
			var httpProm = $http.get(serverurl + 'following');
			return httpProm;	
		}else{
			return "Invalid user";
		}
		
	};

	TweetService.prototype.sendTweet = function(loggedUser, newTweet){
		if(loggedUser.email && newTweet){
			var serverurl = this.getUrl(loggedUser.email);
			var httpProm = $http.post(serverurl, newTweet);
			return httpProm;			
		}else{
			return "Invalid request";
		}

	};

	TweetService.prototype.deleteTweet = function(loggedUser, tweet){
		if (loggedUser.email && tweet.submitter) {
			var serverurl = this.getUrl(loggedUser.email)+ tweet._id;
			var httpProm = $http.delete(serverurl);
			return httpProm;
		} else {
			return 'Invalid request';
		}
	};
	return TweetServiceInstance;
}]);


