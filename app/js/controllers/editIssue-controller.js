trackerApp.controller('EditIssueCtrl', [
    '$scope',
    '$routeParams',
    '$location',
    'issuesService',
    'notifyService',
    function ($scope, $routeParams, $location, issuesService, notifyService) {

        var convertLabels = function toObject(inputArray) {
            var outputArrayAsJson = [];
            for (var i = 0; i < inputArray.length; ++i)
                outputArrayAsJson.push({'Name': inputArray[i]});
            return outputArrayAsJson;
        };

        function getIssueById(id) {
            issuesService.getIssueById(id)
                .then(function success(response) {
                    $scope.issue = response.data;
                }, function error(err) {
                    notifyService.showError("Request failed!", err.statusText);
                })
        }
        getIssueById($routeParams.id);



        $scope.editIssue = function editIssue(issue) {
            var issueforEdit = {
                Title : issue.Title,
                Description : issue.Description,
                DueDate : issue.DueDate,
                ProjectId : parseInt($scope.issue.Project.Id),
                AssigneeId : issue.AssigneeId,
                PriorityId: issue.PriorityId,
                labels : convertLabels(issue.labels)
            };

            issuesService.editIssue(issueforEdit, $routeParams.id)
                .then(function success() {
                    notifyService.showInfo("Issue successful edited!");
                    $location.path('/issues/'+$routeParams.id);
                }, function error(err) {
                    notifyService.showError("Edit issue failed!", err.statusText);
                })
        };

    }
]);