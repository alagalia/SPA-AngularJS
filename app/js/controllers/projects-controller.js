'use strict';

trackerApp
    .controller('ProjectsCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'issuesService',
        'notifyService',
        'authService',
        'pageSize',
        function ($scope, $location, projectsService, issuesService, notifyService, authService, pageSize) {

            var pageNumber = 1;

            $scope.admin = authService.isAdmin();

            $scope.getAllProjects = function(params){
                projectsService.getAllProjects(params)
                    .then(function (allProjects) {
                            $scope.allProjects = allProjects.data.Projects;
                            $scope.numItems = allProjects.data.TotalPages;
                        }, function (err) {
                            var serverError = err.statusText;
                            notifyService.showError("Request failed", serverError);
                        }
                    );
            };

            //--------------START Pagination ---------------//

            $scope.projectRequestParams = {
                pageNumber: 1,
                pageSize: pageSize
            };

            $scope.reloadProjects = function() {
                $scope.getAllProjects($scope.projectRequestParams);
            };

            $scope.getAllProjects($scope.projectRequestParams);


            //-------------END pagination-------------------//


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