'use strict';

trackerApp
    .factory('authenticationService', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function loginUser(loginUser) {

                var deferred = $q.defer();

                var username = loginUser.userEmail;
                var password = loginUser.password;

                var request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Token',
                    data: "grant_type=password&username=" + username + "&password=" + password,
                    headers: {
                        ContentType: "application/x-www-form-urlencoded"
                    }
                };
                $http(request)
                    .then(function (response) {
                        console.log(response.data);
                        deferred.resolve(response.data)
                    }, function (err) {
                        deferred.reject(err)
                    });
                return deferred.promise;
            }


            return {
                loginUser: loginUser
            }
        }]);