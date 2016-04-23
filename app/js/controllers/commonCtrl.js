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
           var filter = function filter(users, val) {
               var filtered = [];
               angular.forEach(users, function (item) {
                   if (item.Username.toLowerCase().indexOf(val) == 0) filtered.push(item);
               });
               return filtered;
            };

            $scope.getAllUsers = function(val){
                userService.getAllUsers()
                .then(function (allUsers) {
                        $scope.allUsers = filter(allUsers, val);
                    console.log($scope.allUsers)
                    }, function (err) {
                        notifyService.showError("Request failed", err.statusText);
                    }
                );
            };

            //todo autocomplete
            //projectsService.getAllExistingLabels()
            //    .then(function (allLabels) {
            //            $scope.allLabels = allLabels;
            //        console.log(allLabels)
            //        }, function (err) {
            //            notifyService.showError("Request failed", err.statusText);
            //        }
            //    );
            //$scope.hide = true;
            //$scope.showLabels = function(){
            //    $scope.hide = false;
            //};
            //$scope.checkTextLenght = function(text){
            //   console.log(text)
            //}
        }
    ]);