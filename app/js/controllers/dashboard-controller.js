'use strict';

trackerApp

    .controller('DashboardCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'issuesService',
        'notifyService',
        function ($scope, $location, projectsService, issuesService, notifyService) {

            $scope.myStaff = function (item) {
                return item.Lead.Username === sessionStorage["userName"];
            };

            projectsService.getAllProjects()
                .then(function (allProjects) {
                        $scope.allProjects = allProjects.data;

                    }, function (err) {
                        var serverError = err.statusText;
                        notifyService.showError("Request failed", serverError);
                    }
                );

            var priorityName = "Urgent";
            var pageSize =  10;
            var pageNumber =  1;
            issuesService.getMyIssues(priorityName, pageSize, pageNumber)
                .then(function (issues) {
                    $scope.myIssues = issues.data.Issues;

                    console.log(issues.data);
                    }, function (err) {
                        var serverError = err.statusText;
                        notifyService.showError("Request failed", serverError);
                    }
                );
        }
    ]);