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

            $scope.getAllProjects = function (params) {
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

            $scope.getIssues = function(params){
                issuesService.getIssues(params)
                    .then(function (issues) {
                            $scope.myIssues = issues.data.Issues;
                        }, function (err) {
                            var serverError = err.statusText;
                            notifyService.showError("Request failed", serverError);
                        }
                    );
            };

            $scope.getAllProjects = function (params) {
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

            $scope.getProjectsByLead = function(val){
                projectsService.getMyProjects(val, pageNumber)
                    .then(function (allProjects) {
                            $scope.allProjects = allProjects.data.Projects;
                        }, function (err) {
                            var serverError = err.statusText;
                            notifyService.showError("Request failed", serverError);
                        }
                    );
            };

            $scope.getAllProjectsByName = function(val){
                console.log(val)
                projectsService.getAllProjectsByName(val, pageNumber)
                    .then(function (allProjects) {
                            $scope.allProjects = allProjects.data.Projects;
                        }, function (err) {
                            var serverError = err.statusText;
                            notifyService.showError("Request failed", serverError);
                        }
                    );
            }

            //--------------START Pagination ---------------//

            //todo get number of projects from date base
            $scope.numItems = 100;
            $scope.projectRequestParams = {
                pageNumber: 1,
                pageSize: pageSize
            };

            $scope.reloadProjects = function() {
                $scope.getAllProjects($scope.projectRequestParams);
            };

            $scope.getAllProjects($scope.projectRequestParams);



            $scope.issueRequestParams = {
                pageNumber: 1,
                pageSize: pageSize
            };
            $scope.reloadIssues = function() {
                $scope.getIssues($scope.issueRequestParams);
            };

            $scope.getIssues($scope.issueRequestParams);
            //-------------END pagination-------------------//


            $scope.projectsPreview = true;
            $scope.issuesPreview = false;
            $scope.showOtherTab = function(tab){
                if(tab == 'projects'){
                    $scope.projectsPreview = true;
                    $scope.issuesPreview = false
                } else {
                    $scope.projectsPreview = false;
                    $scope.issuesPreview = true
                }
            }
        }
    ]);