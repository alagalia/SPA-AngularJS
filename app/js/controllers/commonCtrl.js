'use strict';

trackerApp
    .controller('CommonCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'notifyService',
        'userService',
        function ($scope, $location, projectsService, notifyService, userService) {

            $scope.currentUser = {
                Username: sessionStorage.userName,
                Id :  sessionStorage.userId,
                isAdmin :  sessionStorage.isAdmin
            };

            //getAllUsers and filter them
            $scope.val='';
            $scope.users = function(val) {
                userService.getAllUsers()
                    .then(function (response) {
                        var filtered = [];
                        angular.forEach(response, function (item) {
                            if (item.Username.toLowerCase().indexOf(val) == 0) filtered.push(item);
                        });
                        $scope.allUsers = filtered;
                    }, function (err) {
                        notifyService.showError("'Add project' failed", err.statusText);
                    });
            }

            //todo DELLete
            //userService.getAllUsers()
            //    .then(function (allUsers) {
            //            $scope.allUsers = allUsers;
            //        }, function (err) {
            //            notifyService.showError("Request failed", err.statusText);
            //        }
            //    );

            //todo autocomplete
            projectsService.getAllExistingLabels()
                .then(function (allLabels) {
                        $scope.allLabels = allLabels;
                    }, function (err) {
                        notifyService.showError("Request failed", err.statusText);
                    }
                );
            $scope.hide = true;
            $scope.showLabels = function(){
                $scope.hide = false;
            };
            $scope.checkTextLenght = function(text){
               console.log(text)
            }
        }
    ]);