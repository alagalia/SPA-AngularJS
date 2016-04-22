'use strict';

trackerApp.controller('HomeCtrl', [
    '$scope',
    '$location',
    '$timeout',
    '$window',
    'authenticationService',
    'authService',
    'notifyService',
    'userService',
    function ($scope, $location, $timeout, $window, authenticationService, authService, notifyService, userService) {

        var getCurrentUserInfo = function () {
            userService.getCurrentUser()
                .then(function (currentUser) {
                    sessionStorage['userName'] = currentUser.Username;
                    sessionStorage['userId'] = currentUser.Id;
                    sessionStorage['isAdmin'] = currentUser.isAdmin;
                    $scope.currentUser = currentUser;
                    $scope.username = currentUser.username;
                    $location.path('/dashboard');
                }, function (err) {
                    notifyService.showError("Request failed", err.statusText);
                })
        };


        $scope.userData = authService;

        $scope.login = function (user) {
            authenticationService.loginUser(user)
                .then(function (loggedInUser) {
                    notifyService.showInfo("Login successful");
                    sessionStorage['token'] = loggedInUser.access_token;
                    getCurrentUserInfo()
                }, function (err) {
                    notifyService.showError("Login failed", err.data.error_description);
                });
        };

        $scope.register = function (user) {
            authenticationService.registerUser(user)
                .then(function (loggedInUser) {
                    notifyService.showInfo("Login successful");
                    sessionStorage['token'] = loggedInUser.access_token;
                    getCurrentUserInfo();
                }, function (err) {
                    notifyService.showError("Login failed", err.statusText);
                });
        };
    }
]);