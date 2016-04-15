'use strict';

trackerApp
    .controller('UserCtrl', [
        '$scope',
        'projectsService',
        'notifyService',
        'userService',
        function ($scope, projectsService, notifyService, userService) {

           //var getAllUsers = userService.getAllUsers()
           //     .then(function (allUsers) {
           //             $scope.allUsers = allUsers;
           //         }, function (err) {
           //             var serverError = err.data.error_description;
           //             notifyService.showError("Request failed", serverError);
           //         }
           //     );

            var id = sessionStorage['Id'];

           $scope.makeAdmin = function makeAdmin(id) {
               userService.makeAdmin(id)
                   .then(function (data) {
                           notifyService.showInfo("User was made as admin!", data);
                       }, function (err) {
                           notifyService.showError("Request failed", err);
                       }
                   );
           };

            $scope.changePassword = function changePassword (user) {
                userService.changePassword(user)
                    .then(function (data) {
                            notifyService.showInfo("Password is changed!", data);
                        }, function (err) {
                            notifyService.showError("Password is not changed!", err);
                        }
                    );
            }
        }
    ]);