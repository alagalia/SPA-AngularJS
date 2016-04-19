'use strict';

trackerApp
    .controller('ProjectsCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'issuesService',
        'notifyService',
        function ($scope, $location, projectsService, issuesService, notifyService) {

            var pageNumber =  1;

            $scope.myStaff = function (item) {
                return item.Lead.Username === sessionStorage["userName"];
            };

            projectsService.getAllProjects(pageNumber)
                .then(function (allProjects) {
                        $scope.allProjects = allProjects.data.Projects;
                    }, function (err) {
                        var serverError = err.statusText;
                        notifyService.showError("Request failed", serverError);
                    }
                );


            issuesService.getIssues(pageNumber)
                .then(function (issues) {
                        $scope.myIssues = issues.data.Issues;
                    }, function (err) {
                        var serverError = err.statusText;
                        notifyService.showError("Request failed", serverError);
                    }
                );
        }
    ]);