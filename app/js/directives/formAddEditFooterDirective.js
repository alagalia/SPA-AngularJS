trackerApp
    .directive('formDirective', function(){
        return {
            restrict: 'A',
            templateUrl : 'views/templates/addEditFooterTemplate.html',
            controller : 'CommonCtrl'
        }
    });