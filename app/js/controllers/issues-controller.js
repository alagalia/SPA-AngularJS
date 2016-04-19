trackerApp.controller('IssuesCtrl', [
    '$scope',
    '$routeParams',
    '$location',
    'issuesService',
    'notifyService',
    'statusService',
    function ($scope, $routeParams, $location, issuesService, notifyService, statusService) {

        var issueId = $routeParams.id;
        $scope.showComments = false;
        $scope.show = function () {
            $scope.showComments = !$scope.showComments;
        };

        function getIssueById(id) {
            issuesService.getIssueById(id)
                .then(function success(response) {
                    $scope.issue = response.data;
                    availableStatus(response.data.Status.Id);
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

        $scope.addComment =  function addComment(text) {
            issuesService.addComment(text, issueId)
                .then(function success(response) {
                    //todo scope.apply to refresh comments data
                    notifyService.showInfo("Comment added successful");

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

        getIssueById(issueId);
        getCommentsByIssueId(issueId);

        //-----------status logic------------//

        function availableStatus(id) {
            var statuses = [];
            switch (id) {
                case 2 :
                    statuses = [{"Id": 1, "Name": "Closed"}, {"Id": 3, "Name": "InProgress"}];
                    break;
                case 3 :
                    statuses = [{"Id": 1, "Name": "Closed"}, {"Id": 4, "Name": "StoppedProgress"}];
                    break;
                case 4 :
                    statuses = [{"Id": 3, "Name": "InProgress"}, {"Id": 1, "Name": "Closed"}];
                    break;
                default :
                    statuses = []
            }
            $scope.availableStatus = statuses;
        }

        $scope.changeStatus = function changeStatus(statusId) {
            statusService.changeStatus(issueId, statusId)
                .then(function () {
                        notifyService.showInfo("Status changed! ");
                    }, function (err) {
                        notifyService.showError("Status not changed!", err);
                    }
                );
        };
    }
]);