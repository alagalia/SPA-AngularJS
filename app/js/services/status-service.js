trackerApp
    .factory('statusService', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {


            function changeStatus(issueId, statusId) {
                var deferred = $q.defer();
                var request = {
                    method: 'PUT',
                    url: BASE_URL + 'issues/'+issueId+'/changestatus?statusid='+statusId,
                    headers: {
                        Authorization: "Bearer " + sessionStorage["token"]
                    }
                };

                $http(request)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }




            return {
                changeStatus: changeStatus
            }
        }
    ]);