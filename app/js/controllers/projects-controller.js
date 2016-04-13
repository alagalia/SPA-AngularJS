'use strict';

trackerApp
    .controller('ProjectsCtrl', [
        '$scope',
        'projectsService',
        'notifyService',
        'userService',
        function ($scope, projectsService, notifyService, userService) {

            projectsService.getAllProjects()
                .then(function (allProjects) {
                        $scope.allProjects = allProjects.data;
                    }, function (err) {
                        var serverError = err.data.error_description;
                        notifyService.showError("Request failed", serverError);
                    }
                );


        }
    ]);