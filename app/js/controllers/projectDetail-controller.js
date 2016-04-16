'use strict';

trackerApp
    .controller('ProjectDetailCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        'projectsService',
        'issuesService',
        'notifyService',
        function ($scope, $location, $routeParams, projectsService, issuesService, notifyService) {

            var getProjectById = function getProjectById(id) {
                projectsService.getProjectById(id)
                    .then(function (project) {
                            $scope.projectbyId = project.data;
                            console.log(project.data);
                        $scope.priorities = project.data.Priorities;
                            $scope.isLeader = sessionStorage.userName === project.data.Lead.Username;
                    }, function (err) {
                            notifyService.showError("Request " + "'Get project by ID'" + " failed", err.statusText);
                        }
                    );

                issuesService.getIssuesByProjectId(id)
                    .then(function (issuesById) {
                        $scope.issuesById = issuesById.data;
                        console.log(issuesById)
                    }, function (err) {
                        notifyService.showError("Request 'Get issues' failed", err.statusText);
                    })
            };

            if (isNaN($routeParams.id)) {
                $location.path('/projects');
            } else {
                getProjectById($routeParams.id)
            }

        }
    ]);