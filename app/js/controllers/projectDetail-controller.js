'use strict';

trackerApp
    .controller('ProjectDetailCtrl', [
        '$scope',
        '$routeParams',
        'projectsService',
        'notifyService',
        function($scope, $routeParams, projectsService, notifyService){

            function getProjectBiId(id){
                projectsService.getProjectById(id)
                    .then(function (projectById) {
                            $scope.projectbyId = projectById.data;
                        }, function (err) {
                            var serverError = err.data.error_description;
                            notifyService.showError("Request failed", serverError);
                        }
                    );

                projectsService.getIssuesByProjectId(id)
                    .then(function(issuesById){
                        $scope.issuesById = issuesById.data;
                        console.log(issuesById.data)
                    }, function (err) {
                        var serverError = err.data.error_description;
                        notifyService.showError("Request failed", serverError);
                    })
            }

            getProjectBiId($routeParams.id)
        }
]);