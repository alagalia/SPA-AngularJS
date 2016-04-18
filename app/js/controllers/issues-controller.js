trackerApp.controller('IssuesCtrl',[
    '$scope',
    '$routeParams',
    '$location',
    'issuesService',
    'notifyService',
    function($scope, $routeParams, $location, issuesService, notifyService){

        $scope.showComments = false;
        $scope.show = function(){
            $scope.showComments = !$scope.showComments;
        };

        function getIssueById(id) {
            issuesService.getIssueById(id)
                .then(function success(response) {
                    console.log(response.data)
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
                }, function error(err){
                    notifyService.showError("Edit issue failed!", err.statusText);
                })
        };

        getIssueById($routeParams.id);
        getCommentsByIssueId($routeParams.id)
    }
]);