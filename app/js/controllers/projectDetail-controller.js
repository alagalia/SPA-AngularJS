'use strict';

trackerApp
    .controller('ProjectDetailCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        'projectsService',
        'issuesService',
        'notifyService',
        'authService',
        'pageSize',
        function ($scope, $location, $routeParams, projectsService, issuesService, notifyService, authService, pageSize) {

            $scope.admin = authService.isAdmin();

            //show hide project description logic
            $scope.showDescription = false;
            $scope.ShowDescriptionText = "Show description";
            $scope.showDescript = function(){
                $scope.showDescription = !$scope.showDescription;
                if($scope.showDescription){
                $scope.ShowDescriptionText = "Hide description";
                } else {
                    $scope.ShowDescriptionText = "Show description";
                }
            };


             var getProjectById = function getProjectById(id) {
                projectsService.getProjectById(id)
                    .then(function (response) {
                            $scope.project = response.data;
                            $scope.priorities = response.data.Priorities;
                            $scope.leadUserName = response.data.Lead.Username;
                            $scope.leadId = response.data.Lead.Id;
                            $scope.isLeader = authService.getLoggedUserName() === $scope.leadUserName;
                        }, function (err) {
                            notifyService.showError("Request " + "'Get project by ID'" + " failed", err.statusText);
                        }
                    );
                 issuesService.getIssuesByProjectId(id)
                     .then(function (issuesById) {
                         $scope.issuesById = issuesById.data;
                         $scope.admin = authService.isAdmin();
                     }, function (err) {
                         notifyService.showError("Request 'Get issues' failed", err.statusText);
                     })
            };

            var convertData = function (project) {
                project.labels = toObject(project.labels);
                project.priorities = toObject(project.priorities);

                function toObject(inputArray) {
                    var outputArrayAsJson = [];
                    for (var i = 0; i < inputArray.length; ++i)
                        outputArrayAsJson.push({'Name': inputArray[i]});
                    return outputArrayAsJson;
                }

                if($scope.isLeader){
                    project.LeadId = $scope.leadId;
                }
                return project
            };

            $scope.editProject = function (object) {
                object = convertData(object);
                projectsService.editProject(object)
                    .then(function () {
                        notifyService.showInfo("Project edited successful");
                        $location.path('/');
                    }, function (err) {
                        notifyService.showError("'Edit project' failed", err.statusText);
                    });
            };

            if (isNaN($routeParams.id)) {
                $location.path('/projects');
            } else {
                getProjectById($routeParams.id)
            }

        }
    ]);