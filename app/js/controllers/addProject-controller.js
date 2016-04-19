'use strict';

trackerApp

    .controller('AddProjectCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'issuesService',
        'notifyService',
        'userService',
        function ($scope, $location, projectsService, issuesService, notifyService, userService) {

                var convertData = function (project){
                        project.labels = toObject(project.labels);
                        project.priorities = toObject(project.priorities);

                        function toObject(inputArray) {
                            var outputArrayAsJson = [];

                            //todo with foreach
                                inputArray.forEach(function (element) {
                                    outputArrayAsJson.push({Name: element});
                                });

                                //for (var i = 0; i < inputArray.length; ++i)
                                //        outputArrayAsJson.push({'Name': inputArray[i]});
                                return outputArrayAsJson;
                        }
                        return project
                };

                $scope.addProject = function (object) {
                        //todo project. ProjectKey from first letters
                        object = convertData(object);
                        projectsService.addProject(object)
                            .then(function () {
                                    notifyService.showInfo("Project added successful");
                                    $location.path('/projects');
                            }, function (err) {
                                    notifyService.showError("'Add project' failed", err.statusText);
                            });
                };

                var getAllUsers = userService.getAllUsers()
                    .then(function (allUsers) {
                            $scope.allUsers = allUsers;
                        }, function (err) {
                            var serverError = err.data.error_description;
                            notifyService.showError("Request failed", serverError);
                        }
                    );

        }
    ]);