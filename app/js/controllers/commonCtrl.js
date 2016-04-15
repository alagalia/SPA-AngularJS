'use strict';

trackerApp
    .filter('highlight', function ($sce) {
        return function (text, phrase) {
            if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="highlighted">$1</span>');

            return $sce.trustAsHtml(text)
        }
    })


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
               console.log(text)
            }
        }
    ]);