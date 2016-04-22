trackerApp.controller('AddIssueCtrl', [
    '$scope',
    '$routeParams',
    '$location',
    'issuesService',
    'notifyService',
    function ($scope, $routeParams, $location, issuesService, notifyService) {

        $scope.projectId = $routeParams.id;
        var convertLabels = function toObject(inputArray) {
            var outputArrayAsJson = [];
            inputArray.forEach(function (element) {
                outputArrayAsJson.push({Name: element});
            });
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
                    $location.path('/projects/' +  $scope.projectId);
                }, function error(err) {
                    notifyService.showError("Add failed!", err.statusText);
                })
        };
    }
]);