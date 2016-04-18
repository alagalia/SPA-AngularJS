trackerApp
    .factory('issuesService',[
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){

            //todo add issue and edit issue
                function getIssuesByProjectId(id){
                        var deferred = $q.defer();
                        var request = {
                                method: 'GET',
                                url: BASE_URL + 'Projects/'+ id + '/Issues',
                                headers: {
                                        Authorization: "Bearer "+sessionStorage["token"]
                                }
                        };

                        $http(request)
                            .then(function(response){
                                    deferred.resolve(response);
                            },function(err){
                                    deferred.reject(err);
                            });
                        return deferred.promise;
                }

                function addIssue(issue){
                        var deferred = $q.defer();
                        var request = {
                                method: 'POST',
                                url: BASE_URL + 'issues/',
                                headers: {
                                        Authorization: "Bearer "+sessionStorage["token"]
                                },
                                data : issue
                        };

                        $http(request)
                            .then(function(response){
                                    deferred.resolve(response);
                            },function(err){
                                    deferred.reject(err);
                            });
                        return deferred.promise;
                }

                function editIssue(issue, id){
                        var deferred = $q.defer();
                        var request = {
                                method: 'PUT',
                                url: BASE_URL + 'issues/' + id,
                                headers: {
                                        Authorization: "Bearer "+sessionStorage["token"]
                                },
                                data : issue
                        };

                        $http(request)
                            .then(function(response){
                                    deferred.resolve(response);
                            },function(err){
                                    deferred.reject(err);
                            });
                        return deferred.promise;
                }


                function getIssueById(id){
                        var deferred = $q.defer();
                        var request = {
                                method: 'GET',
                                url: BASE_URL + 'issues/'+id,
                                headers: {
                                        Authorization: "Bearer "+sessionStorage["token"]
                                }
                        };

                        $http(request)
                            .then(function(response){
                                    deferred.resolve(response);
                            },function(err){
                                    deferred.reject(err);
                            });
                        return deferred.promise;
                }

                //AJAX with QUERY for all issues
                function getIssues(priorityName, pageSize){
                        var deferred = $q.defer();
                        var request = {
                                method: 'GET',
                                //url: BASE_URL + 'issues/?filter=Priority.Name == "' + priorityName + '"&pageSize='+ pageNumber + '&pageNumber=1',
                                url: BASE_URL + 'issues/?filter=Assignee.Username == "'+ sessionStorage["userName"]+'"&pageSize='+ pageSize + '&pageNumber=1',
                                headers: {
                                        Authorization: "Bearer "+sessionStorage["token"]
                                }
                        };

                        $http(request)
                            .then(function(response){
                                    deferred.resolve(response);
                            },function(err){
                                    deferred.reject(err);
                            });
                        return deferred.promise;
                }

                //get ISSUES by descending order
                function getMyIssues(priorityName, pageSize, pageNumber){
                        var deferred = $q.defer();
                        var request = {
                                method: 'GET',
                                             //issues/me?orderBy=Project.Name desc, IssueKey&pageSize=1&pageNumber=1
                            url: BASE_URL + 'issues/me?orderBy=DueDate desc, IssueKey&pageSize='+ pageSize + '&pageNumber='+pageNumber,
                                headers: {
                                        Authorization: "Bearer "+sessionStorage["token"]
                                }
                        };

                        $http(request)
                            .then(function(response){
                                    deferred.resolve(response);
                            },function(err){
                                    deferred.reject(err);
                            });
                        return deferred.promise;
                }

                function getCommentsByIssueId(id){
                        var deferred = $q.defer();
                        var request = {
                                method: 'GET',
                                url: BASE_URL + 'issues/'+id +'/comments',
                                headers: {
                                        Authorization: "Bearer "+sessionStorage["token"]
                                }
                        };

                        $http(request)
                            .then(function(response){
                                    deferred.resolve(response);
                            },function(err){
                                    deferred.reject(err);
                            });
                        return deferred.promise;
                }


                return {
                        getIssuesByProjectId: getIssuesByProjectId,
                        addIssue : addIssue,
                        editIssue : editIssue,
                        getIssueById : getIssueById,
                        getIssues : getIssues,
                        getMyIssues : getMyIssues,
                        getCommentsByIssueId : getCommentsByIssueId
                }
        }
    ]);