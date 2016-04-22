'use strict';

// Declare app level module which depends on views, and components
angular.module('minitw', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'UserCtrl'
    })
  	.when('/main', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
    })
    .otherwise({
        redirectTo: '/login'
    });
}]);