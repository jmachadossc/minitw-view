'use strict';

// Declare app level module which depends on views, and components
angular.module('minitw', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);