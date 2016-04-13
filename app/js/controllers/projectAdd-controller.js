'use strict';

trackerApp
    .controller('ProjectAddCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'notifyService',
        'userService',
        function ($scope, $location, projectsService, notifyService, userService, UserCtrl) {

            $scope.priorities = {
                multipleSelect: []
            };


            $scope.addProject = function (project) {
                projectsService.addProject(project)
                    .then(function (addedProject) {
                        notifyService.showInfo("Project added successful");
                        $location.path('/projects');
                    }, function (err) {
                        notifyService.showError("'Add project' failed", err.statusText);
                    });
            };

            userService.getAllUsers()
                .then(function (allUsers) {
                        $scope.allUsers = allUsers;
                    }, function (err) {
                        notifyService.showError("Request failed", err.statusText);
                    }
                );


            projectsService.getAllExistingLabels()
                .then(function (allLabels) {
                        $scope.allLabels = allLabels;
                    console.log(allLabels)
                    }, function (err) {
                        notifyService.showError("Request failed", err.statusText);
                    }
                );

        }
    ]);