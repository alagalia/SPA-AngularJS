trackerApp.controller('AddIssueCtrl', [
    '$scope',
    '$routeParams',
    '$location',
    'issuesService',
    'notifyService',
    function ($scope, $routeParams, $location, issuesService, notifyService) {

        var projectId = $routeParams.id;
        var convertLabels = function toObject(inputArray) {
            //todo with foreach
            var outputArrayAsJson = [];
            for (var i = 0; i < inputArray.length; ++i)
                outputArrayAsJson.push({'Name': inputArray[i]});
            return outputArrayAsJson;
        };

        $scope.addIssue = function addIssue(issueForAdd) {
            issueForAdd.ProjectId = $routeParams.id;
            if (issueForAdd.Labels) {
                issueForAdd.Labels = convertLabels(issueForAdd.Labels);
            }
            issuesService.addIssue(issueForAdd)
                .then(function success() {
                    notifyService.showInfo("Issue successful added!");
                    $location.path('/projects/' + projectId);
                }, function error(err) {
                    notifyService.showError("Add failed!", err.statusText);
                })
        };
    }
]);