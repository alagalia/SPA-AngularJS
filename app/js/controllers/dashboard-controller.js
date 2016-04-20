'use strict';

trackerApp
    .controller('DashboardCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'issuesService',
        'notifyService',
        'authService',
        function ($scope, $location, projectsService, issuesService, notifyService, authService) {

            $scope.admin = authService.isAdmin();
            var userName = authService.getLoggedUserName();
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