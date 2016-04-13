trackerApp
    .factory('issuesService',[
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){

            //todo
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

                return {
                        getIssuesByProjectId: getIssuesByProjectId
                }
        }
    ]);