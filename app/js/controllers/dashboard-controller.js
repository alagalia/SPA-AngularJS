'use strict';

trackerApp

    .controller('DashboardCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'notifyService',
        'userService',
        function ($scope, $location, projectsService, notifyService, userService) {

            $scope.myStaff = function (item) {
                return item.Lead.Username === sessionStorage["userName"];
            };

            var convertData = function (project){
                project.labels = toObject(project.labels);
                project.priorities = toObject(project.priorities);

                function toObject(inputArray) {
                    var outputArrayAsJson = [];
                    for (var i = 0; i < inputArray.length; ++i)
                        outputArrayAsJson.push({'Name': inputArray[i]});
                    return outputArrayAsJson;
                }
                return project
            };

            $scope.addProject = function (object) {
                //todo project. ProjectKey from first letters
                object = convertData(project);
                projectsService.addProject(object)
                    .then(function () {
                        notifyService.showInfo("Project added successful");
                        $location.path('/projects');
                    }, function (err) {
                        notifyService.showError("'Add project' failed", err.statusText);
                    });
            };



            projectsService.getAllProjects()
                .then(function (allProjects) {
                        $scope.allProjects = allProjects.data;
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
        }
    ]);