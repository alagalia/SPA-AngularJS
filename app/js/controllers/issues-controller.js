trackerApp.controller('IssuesCtrl',[
    '$scope',
    '$routeParams',
    '$location',
    'issuesService',
    'notifyService',
    function($scope, $routeParams, $location, issuesService, notifyService){
        //todo

        var convertLabels = function toObject(inputArray) {
                var outputArrayAsJson = [];
                for (var i = 0; i < inputArray.length; ++i)
                    outputArrayAsJson.push({'Name': inputArray[i]});
                return outputArrayAsJson;
            };

        $scope.addIssue = function addIssue (issue){
            issue.ProjectId = $routeParams.id;
            issue.AssigneeId = issue.LeadId;
            issue.labels = convertLabels(issue.labels);
            issuesService.addIssue(issue)
                .then(function success(response){
                    notifyService.showInfo("Issue successful added!");
                    console.log(response);
                    $location.path('/projects/issue.ProjectId');
                }, function error(err){
                    notifyService.showError("Add failed!", err.statusText);
                })
        }
    }
]);