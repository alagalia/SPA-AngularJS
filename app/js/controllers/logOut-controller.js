'use strict';

trackerApp
    .controller('LogOutCtrl', [
        '$scope',
        '$location',
        '$window',
        '$timeout',
        'projectsService',
        'notifyService',
        'userService',
        function ($scope, $location, $window, $timeout, projectsService, notifyService, userService) {


            $scope.logOut = function logOut() {
                userService.logOut()
                    .then(function () {
                            sessionStorage.clear();
                            notifyService.showInfo("Logout successful!");
                            $location.path('/');
                        }, function (err) {
                            notifyService.showError("Request reject!", err);
                        }
                    );
            }


        }
    ]);