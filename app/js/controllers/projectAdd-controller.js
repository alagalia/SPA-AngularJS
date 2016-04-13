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
                var labels = project.labelsArray;
                var priorities = project.prioritiesAsArray;

                //todo project. ProjectKey from first letters

                project.labels = toObject(labels);
                project.priorities = toObject(priorities);

                function toObject(inputArray) {
                    var outputArrayAsJson = [];
                    for (var i = 0; i < inputArray.length; ++i)
                        outputArrayAsJson.push({'Name': inputArray[i]});
                    return outputArrayAsJson;
                }


                projectsService.addProject(project)
                    .then(function () {
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