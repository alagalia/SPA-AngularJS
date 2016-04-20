'use strict';

var trackerApp = angular.module('trackerApp', [
        'ngRoute'
    ])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('pageSize', 10)
    .config(['$routeProvider',
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
                .when('/dashboard', {
                    templateUrl: 'views/dashboard.html',
                    controller: 'DashboardCtrl',
                    data: {
                        requireLogin: true
                    }
                })
                .when('/projects', {
                    templateUrl: 'views/projects.html',
                    controller: 'ProjectsCtrl',
                    data: {
                        requireLogin: true
                    }
                })
                .when('/add', {
                    templateUrl: 'views/add-project.html',
                    controller: 'AddProjectCtrl',
                    data: {
                        requireLogin: true
                    }
                })
                .when('/projects/:id', {
                    templateUrl: 'views/project-details.html',
                    controller: 'ProjectDetailCtrl',
                    data: {
                        requireLogin: true
                    }
                })
                .when('/projects/:id/edit', {
                    templateUrl: 'views/edit-project.html',
                    controller: 'ProjectDetailCtrl',
                    data: {
                        requireLogin: true
                    }
                })
                .when('/profile/password', {
                    templateUrl: 'views/user-profile.html',
                    data: {
                        requireLogin: true
                    }
                })
                .when('/logout', {
                    templateUrl: 'views/logOut.html',
                    controller: 'LogOutCtrl',
                    data: {
                        requireLogin: true
                    }
                })
                .when('/issues/:id', {
                    templateUrl: 'views/issue-details.html',
                    controller: 'IssuesCtrl',
                    data: {
                        requireLogin: true
                    }
                })
                .when('/projects/:id/add-issue', {
                    templateUrl: 'views/add-issue.html',
                    controller: 'AddIssueCtrl',
                    data: {
                        requireLogin: true
                    }
                })
                .when('/issues/:id/edit', {
                    templateUrl: 'views/edit-issue.html',
                    controller: 'EditIssueCtrl',
                    data: {
                        requireLogin: true
                    }
                })
                .otherwise({redirectTo: '/'});
        }])


    //------------------------------------
    .run(function($location, $rootScope, authService) {

        $rootScope.$on('$routeChangeStart', function(event, next) {
            if (next.data) {
                if (!authService.isLoggedUser() && next.data.requireLogin) {
                    $location.path('/');
                }
            }
        });
    });
