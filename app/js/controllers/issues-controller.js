trackerApp.controller('IssuesCtrl', [
    '$scope',
    '$routeParams',
    '$location',
    'issuesService',
    'notifyService',
    function ($scope, $routeParams, $location, issuesService, notifyService) {

        $scope.showComments = true;
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
                    notifyService.showError("Comment added successful", err.statusText);

                }, function error(err) {
                    notifyService.showError("Request failed!", err.statusText);
                })
        }

        $scope.addComment =  function(text) {
            issuesService.addComment(text, $routeParams.id)
                .then(function success(response) {
                    //todo scope.apply to refresh comments data
                    
                }, function error(err) {
                    notifyService.showError("Request failed!", err.statusText);
                })
        };

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