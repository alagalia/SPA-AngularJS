trackerApp.controller('IssuesCtrl', [
    '$scope',
    '$routeParams',
    '$location',
    'issuesService',
    'notifyService',
    function ($scope, $routeParams, $location, issuesService, notifyService) {

        $scope.showComments = false;
        $scope.show = function () {
            $scope.showComments = !$scope.showComments;
        };

        function getIssueById(id) {
            issuesService.getIssueById(id)
                .then(function success(response) {
                    $scope.issue = response.data;
                }, function error(err) {
                    notifyService.showError("Request failed!", err.statusText);
                })
        }

        function getCommentsByIssueId(id) {
            issuesService.getCommentsByIssueId(id)
                .then(function success(response) {
                    $scope.comments = response.data;
                }, function error(err) {
                    notifyService.showError("Request failed!", err.statusText);
                })
        }

        var convertLabels = function toObject(inputArray) {
            var outputArrayAsJson = [];
            for (var i = 0; i < inputArray.length; ++i)
                outputArrayAsJson.push({'Name': inputArray[i]});
            return outputArrayAsJson;
        };

        getIssueById($routeParams.id);
        getCommentsByIssueId($routeParams.id)
    }
]);