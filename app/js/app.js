'use strict';

var trackerApp = angular.module('trackerApp', [
        'ngRoute'
    ])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'HomeCtrl'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'HomeCtrl'
        })
        .when('/wellcome', {
            templateUrl: 'views/wellcome.html'
        })
        .when('/projects', {
            templateUrl: 'views/projects.html',
            controller: 'ProjectsCtrl'
        })
        .when('/projects/:id', {
            templateUrl: 'views/project-details.html',
            controller: 'ProjectDetailCtrl'
        })
        .otherwise({redirectTo: '/wellcome'});
}]);
