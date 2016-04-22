'use strict';

trackerApp
    .controller('UserCtrl', [
        '$scope',
        '$location',
        '$window',
        'projectsService',
        'notifyService',
        'userService',
        function ($scope, $location, $window, projectsService, notifyService, userService) {

            var id = sessionStorage['Id'];
            $scope.showForm = false;

            $scope.show = function show(){
                $scope.showForm = !$scope.showForm;
            };


            $scope.makeAdmin = function makeAdmin(id) {
                userService.makeAdmin(id)
                    .then(function (data) {
                            notifyService.showInfo("User was made as admin!", data);
                        }, function (err) {
                            notifyService.showError("Request failed", err);
                        }
                    );
            };

            $scope.changePassword = function changePassword(user) {
                userService.changePassword(user)
                    .then(function (data) {
                            notifyService.showInfo("Password is changed!", data);
                        $location.path('/dashboards');
                        }, function (err) {
                            notifyService.showError("Password is not changed!", err);
                        }
                    );
            };
        }
    ]);