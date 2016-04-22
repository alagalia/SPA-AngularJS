'use strict';

trackerApp

    .controller('AddProjectCtrl', [
        '$http',
        '$scope',
        '$location',
        'projectsService',
        'issuesService',
        'notifyService',
        'userService',
        function ($http, $scope, $location, projectsService, issuesService, notifyService, userService) {


            var convertToPureDate = function (project) {

                //produce projectKey
                var str = project.Name;
                var matches = str.match(/\b(\w)/g);
                var acronym = matches.join('');
                project.ProjectKey = acronym.toUpperCase();

                //set Name property
                project.labels = toObject(project.labels);
                project.priorities = toObject(project.priorities);

                function toObject(inputArray) {
                    var outputArrayAsJson = [];
                    inputArray.forEach(function (element) {
                        outputArrayAsJson.push({Name: element});
                    });
                    return outputArrayAsJson;
                }

                //get Lead Id

                return project
            };


  //todo DELLete
            // $scope.val='';
            //$scope.users = function(val) {
            //    userService.getAllUsers()
            //        .then(function (response) {
            //            var filtered = [];
            //            angular.forEach(response, function (item) {
            //                if (item.Username.toLowerCase().indexOf(val) == 0) filtered.push(item);
            //            });
            //            $scope.allUsers = filtered;
            //            $scope.all = filtered;
            //            console.log(filtered)
            //        }, function (err) {
            //            notifyService.showError("'Add project' failed", err.statusText);
            //        });
            //}
            //

            $scope.addProject = function (project,id) {
                project = convertToPureDate(project);
                projectsService.addProject(project)
                    .then(function () {
                        notifyService.showInfo("Project added successful");
                        $location.path('/projects');
                    }, function (err) {
                        notifyService.showError("'Add project' failed", err.statusText);
                    });
            };



//ORIGINAL
            var users = userService.getAllUsers()
                .then(function (response) {
                    $scope.allUsers = response;
                }, function (err) {
                    notifyService.showError(err.statusText);
                });


        }
    ]);