'use strict';

trackerApp
    .controller('IssueDetailCtrl', [
        '$scope',
        '$routeParams',
        'projectsService',
        'issuesService',
        'notifyService',
        function($scope, $routeParams, projectsService, issuesService, notifyService){

                function getIssueById (id){
                        issuesService.getIssueById(id)
                            .then(function success(response){
                                $scope.issue = response.data;
                                console.log(response.data);
                            }, function error(err){
                                    notifyService.showError("Request failed!", err.statusText);
                            })
                }

            getIssueById($routeParams.id);
        }
    ]);