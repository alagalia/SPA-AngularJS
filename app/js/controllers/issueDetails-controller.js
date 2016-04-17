'use strict';

trackerApp
    .controller('IssueDetailCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        'projectsService',
        'issuesService',
        'notifyService',
        function($scope, $location, $routeParams, projectsService, issuesService, notifyService){

                function getIssueById (){
                        issuesService.getIssueById($routeParams.id)
                            .then(function success(response){
                                    $scope.issue = response.data;
                                    $location.path('/projects/issue.ProjectId');
                            }, function error(err){
                                    notifyService.showError("Request failed!", err.statusText);
                            })
                };
        }
    ]);