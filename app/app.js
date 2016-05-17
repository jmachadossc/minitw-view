'use strict';


angular.module('minitw', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	when('/login', {
        templateUrl: 'app/partials/login/login.html',
        controller: 'LoginCtrl'
    })
  	.when('/main', {
        templateUrl: 'app/partials/main/main.html',
        controller: 'MainCtrl'
    })
    .when('/register',{
        templateUrl: 'app/partials/register/register.html',
        controller: 'RegisterCtrl'
    })
    .when('/profile',{
        templateUrl: 'app/partials/profile/profile.html',
        controller: 'ProfileCtrl'
    })
    .otherwise({
        redirectTo: '/login'
    });
}]);