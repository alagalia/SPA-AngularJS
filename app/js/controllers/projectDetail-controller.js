'use strict';

trackerApp
    .controller('ProjectDetailCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        'projectsService',
        'issuesService',
        'notifyService',
        'authService',
        function ($scope, $location, $routeParams, projectsService, issuesService, notifyService, authService) {


            var getProjectById = function getProjectById(id) {
                projectsService.getProjectById(id)
                    .then(function (response) {
                            $scope.project = response.data;
                            $scope.priorities = response.data.Priorities;
                            $scope.isLeader = authService.getLoggedUserName() === response.data.Lead.Username;
                        }, function (err) {
                            notifyService.showError("Request " + "'Get project by ID'" + " failed", err.statusText);
                        }
                    );

                issuesService.getIssuesByProjectId(id)
                    .then(function (issuesById) {
                        $scope.issuesById = issuesById.data;
                        $scope.admin = authService.isAdmin();
                    }, function (err) {
                        notifyService.showError("Request 'Get issues' failed", err.statusText);
                    })
            };

            var convertData = function (project) {
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

            $scope.editProject = function (object) {
                //todo project. ProjectKey from first letters
                object = convertData(object);
                projectsService.editProject(object)
                    .then(function () {
                        notifyService.showInfo("Project edited successful");
                        $location.path('/projects');
                    }, function (err) {
                        notifyService.showError("'Edit project' failed", err.statusText);
                    });
            };

            if (isNaN($routeParams.id)) {
                $location.path('/projects');
            } else {
                getProjectById($routeParams.id)
            }

        }
    ]);