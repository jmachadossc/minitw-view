'use strict';

// Declare app level module which depends on views, and components
angular.module('minitw', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
    })
  	.when('/main', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
    })
    .when('/register',{
        templateUrl: 'app/register/register.html',
        controller: 'RegisterCtrl'
    })
    .when('/profile',{
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl'
    })
    .otherwise({
        redirectTo: '/login'
    });
}]);