'use strict';

var trackerApp = angular.module('trackerApp', [
        'ngRoute'
    ])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .config([
        '$routeProvider',
        function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/wellcome.html'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'HomeCtrl'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'HomeCtrl'
        })
        .when('/projects', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .when('/add', {
            templateUrl: 'views/add-project.html',
            controller: 'AddProjectVtrl'
        })
        .when('/projects/:id', {
            templateUrl: 'views/project-details.html',
            controller: 'ProjectDetailCtrl'
        })
        .when('/projects/:id/edit', {
            templateUrl: 'views/edit-project.html',
            controller: 'ProjectDetailCtrl'
        })
        .when('/profile/password', {
            templateUrl: 'views/user-profile.html'
        })
        .when('/logout', {
            templateUrl: 'views/logOut.html',
            controller: 'UserCtrl'
        })
        .when('/issues/:id', {
            templateUrl: 'views/issue-details.html',
            controller: 'IssuesCtrl'
        })
        .when('/projects/:id/add-issue', {
            templateUrl: 'views/add-issue.html',
            controller: 'AddIssueCtrl'
        })
        .when('/issues/:id/edit', {
            templateUrl: 'views/edit-issue.html',
            controller: 'EditIssueCtrl'
        })
        .otherwise({redirectTo: '/'});
}]);
