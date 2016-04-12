'use strict';

trackerApp
    .controller('ProjectsCtrl', [
        '$scope',
        'projectsService',
        'notifyService',
        'userService',
        function ($scope, projectsService, notifyService, userService) {
            function getAllProjects (){
                projectsService.getAllProjects()
                    .then(function (allProjects) {
                            $scope.allProjects = allProjects.data;
                        }, function (err) {
                            var serverError = err.data.error_description;
                            notifyService.showError("Request failed", serverError);
                        }
                    );
            }

                userService.getAllUser()
                    .then(function (allUsers) {
                        $scope.allUsers = allUsers;
                    }, function (err) {
                        var serverError = err.data.error_description;
                        notifyService.showError("Request failed", serverError);
                    }
                );

            getAllProjects();//todo delete? and direct call to projectsService.getAllProjects()...
        }
    ]);