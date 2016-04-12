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
                    notifyService.showInfo("Login successful");
                    sessionStorage['token'] = loggedInUser.access_token;
                    $scope.username = loggedInUser.username;
                    $scope.isLoggedInSomeone = true;
                    $location.path('/dashboard');
                }, function (err) {
                    var serverError = err.data.error_description;
                    notifyService.showError("Login failed", serverError);
                });
        };
    }
]);