'use strict';



angular.module('minitw').directive('myTweetDirective', function() {
	return {
		scope: {
			user: "=myUser",
			tweet: "=myTweet",
			deleteTweetFunction: "&",
			featureFunction: "&"
		},
		restrict: 'A',
		templateUrl: 'app/partials/tweet/tweet.html',
		link: function (scope) {

			scope.$watch('tweet', function (old,curr){
				if (old!==curr){
					console.log('tweet',scope.tweet);
				}
			});
	    }
	};
});