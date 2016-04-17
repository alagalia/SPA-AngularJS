trackerApp.controller('IssuesCtrl',[
    '$scope',
    '$routeParams',
    '$location',
    'issuesService',
    'notifyService',
    function($scope, $routeParams, $location, issuesService, notifyService){



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
                .then(function success(){
                    notifyService.showInfo("Issue successful added!");
                    $location.path('/projects/issue.ProjectId');
                }, function error(err){
                    notifyService.showError("Add failed!", err.statusText);
                })
        };

        $scope.editIssue = function editIssue (issue){
            issue.ProjectId = $routeParams.id;
            issue.AssigneeId = issue.LeadId;
            issue.labels = convertLabels(issue.labels);
            issuesService.editIssue(issue)
                .then(function success(){
                    notifyService.showInfo("Issue successful added!");
                    $location.path('/');
                }, function error(err){
                    notifyService.showError("Edit issue failed!", err.statusText);
                })
        };
    }
]);