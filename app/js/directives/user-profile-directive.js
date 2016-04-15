trackerApp
    .directive('profileDirective', function(){
        return {
            restrict: 'A',
            templateUrl : 'views/templates/userProfiletemplate.html',
            controller : 'CommonCtrl'
        }
    });