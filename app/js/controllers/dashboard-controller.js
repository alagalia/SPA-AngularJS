'use strict';

trackerApp
    .controller('DashboardCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'issuesService',
        'notifyService',
        'authService',
        '$timeout',
        function ($scope, $location, projectsService, issuesService, notifyService, authService, $timeout) {

            $scope.myStaff = function (item) {
                return item.Lead.Username === sessionStorage["userName"];
            };

            var userName = authService.getLoggedUser();
            var pageNumber = 1;


            projectsService.getMyProjects(userName,pageNumber)
                .then(function (allProjects) {
                        $scope.allProjects = allProjects.data.Projects;
                    }, function (err) {
                        var serverError = err.statusText;
                        notifyService.showError("Request failed", serverError);
                    }
                );

            issuesService.getMyIssues(pageNumber)
                .then(function (issues) {
                    $scope.myIssues = issues.data.Issues;
                    }, function (err) {
                        var serverError = err.statusText;
                        notifyService.showError("Request failed", serverError);
                    }
                );
        }
    ]);