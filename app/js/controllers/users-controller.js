'use strict';

trackerApp
    .controller('UserCtrl', [
        '$scope',
        'projectsService',
        'notifyService',
        'userService',
        function ($scope, projectsService, notifyService, userService) {

            userService.getCurrentUser()
                .then(function (currentUser) {
                        $scope.currentUser = currentUser;
                    }, function (err) {
                        var serverError = err.data.error_description;
                        notifyService.showError("Request failed", serverError);
                    }
                );

            var getAllUsers = userService.getAllUsers()
                .then(function (allUsers) {
                        $scope.allUsers = allUsers;
                    }, function (err) {
                        var serverError = err.data.error_description;
                        notifyService.showError("Request failed", serverError);
                    }
                );

            var makeAdmin = userService.makeAdmin(id)
                .then(function (data) {
                    notifyService.showInfo("User was made as admin!", data);
                }, function (err) {
                    notifyService.showError("Request failed", err);
                }
            );
        }
    ]);