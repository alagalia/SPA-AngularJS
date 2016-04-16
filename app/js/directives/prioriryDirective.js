trackerApp
    .directive('priorityDirective', function(){
        return {
            restrict: 'A',
            templateUrl : 'views/templates/priorityTemplate.html',
            controller : 'ProjectDetailCtrl'
        }
    });