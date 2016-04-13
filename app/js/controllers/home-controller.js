'use strict';

trackerApp.controller('HomeCtrl', [
    '$scope',
    '$location',
    'authenticationService',
    'notifyService',
    function ($scope, $location, authenticationService, notifyService) {
        $scope.login = function (user) {
            authenticationService.loginUser(user)
                .then(function (loggedInUser) {
                    console.log(loggedInUser)
                    notifyService.showInfo("Login successful");
                    sessionStorage['token'] = loggedInUser.access_token;
                    sessionStorage['userName'] = loggedInUser.userName;
                    $scope.username = loggedInUser.username;
                    $scope.isLoggedInSomeone = true;
                    $location.path('/projects');
                }, function (err) {
                    notifyService.showError("Login failed", err.statusText);
                });
        };

        $scope.register = function (user) {
            authenticationService.registerUser(user)
                .then(function (loggedInUser) {
                    notifyService.showInfo("Login successful");
                    sessionStorage['token'] = loggedInUser.access_token;
                    $scope.username = loggedInUser.username;
                    $scope.isLoggedInSomeone = true;
                    $location.path('/projects');
                }, function (err) {
                    notifyService.showError("Login failed", err.statusText);
                });
        };
    }
]);