'use strict';

trackerApp
    .filter('highlight', function ($sce) {
        return function (text, phrase) {
            if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="highlighted">$1</span>')

            return $sce.trustAsHtml(text)
        }
    })


    .controller('ProjectAddCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'notifyService',
        'userService',
        function ($scope, $location, projectsService, notifyService, userService, UserCtrl) {

            $scope.data = [
                {text: "<< ==== Put text to Search ===== >>"}
            ];


            $scope.priorities = {
                multipleSelect: []
            };


            $scope.addProject = function (project) {
                var labels = project.labelsArray;
                var priorities = project.prioritiesAsArray;

                //todo project. ProjectKey from first letters

                project.labels = toObject(labels);
                project.priorities = toObject(priorities);

                function toObject(inputArray) {
                    var outputArrayAsJson = [];
                    for (var i = 0; i < inputArray.length; ++i)
                        outputArrayAsJson.push({'Name': inputArray[i]});
                    return outputArrayAsJson;
                }


                projectsService.addProject(project)
                    .then(function () {
                        notifyService.showInfo("Project added successful");
                        $location.path('/projects');
                    }, function (err) {
                        notifyService.showError("'Add project' failed", err.statusText);
                    });
            };

            userService.getAllUsers()
                .then(function (allUsers) {
                        $scope.allUsers = allUsers;
                    }, function (err) {
                        notifyService.showError("Request failed", err.statusText);
                    }
                );

            //todo autocomplete
            projectsService.getAllExistingLabels()
                .then(function (allLabels) {
                        $scope.allLabels = allLabels;
                    }, function (err) {
                        notifyService.showError("Request failed", err.statusText);
                    }
                );
            $scope.hide = true;
            $scope.showLabels = function(text){
                $scope.hide = false;
            };
            $scope.checkTextLenght = function(text){
                if(text.length==0){
                    $scope.hide = true;
                };
            }
        }
    ]);