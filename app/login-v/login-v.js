'use strict';

angular.module('minitw.login-v', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login-v', {
    templateUrl: 'login-v/login-v.html',
    controller: 'LoginVCtrl'
  });
}])

.controller('LoginVCtrl', [function() {

}]);