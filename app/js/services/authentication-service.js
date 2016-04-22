'use strict';

trackerApp
    .factory('authenticationService', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function loginUser(loginUser) {

                var deferred = $q.defer();
                var userEmail = loginUser.userEmail;
                var password = loginUser.password;
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Token',
                    data: "grant_type=password&username=" + userEmail + "&password=" + password,
                    headers: {
                        ContentType: "application/x-www-form-urlencoded"
                    }
                };
                $http(request)
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function (err) {
                        deferred.reject(err)
                    });
                return deferred.promise;
            }

            function registerUser(regiserUser) {

                var deferred = $q.defer();
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Account/Register',

                    data: {
                        'Email': regiserUser.userEmail,
                        'Password' : regiserUser.password,
                        'ConfirmPassword': regiserUser.confirmPassword
                    },
                    headers: {
                        ContentType: "application/x-www-form-urlencoded"
                    }
                };
                $http(request)
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function (err) {
                        deferred.reject(err)
                    });
                return deferred.promise;
            }

            return {
                loginUser: loginUser,
                registerUser: registerUser
            }
        }]);