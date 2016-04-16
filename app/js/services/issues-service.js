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


                return {
                        getIssuesByProjectId: getIssuesByProjectId,
                        addIssue : addIssue
                }
        }
    ]);