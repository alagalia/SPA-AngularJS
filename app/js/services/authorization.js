'use strict';

trackerApp
    .factory('authService',[function(){

            function isLoggedUser() {
                var sessionUser = sessionStorage['userName'];
                return !!sessionUser;
            }

            function getLoggedUser() {
                return sessionStorage['userName'];
            }

            function setLoggedUser(userName) {
                if (!!userName) {
                    sessionStorage['userName'] = user;
                }
            }

        //function getCurrentUser() {
        //
        //        var deferred = $q.defer();
        //        var request = {
        //            method: 'GET',
        //            url: BASE_URL + 'Users/me',
        //            headers: {
        //                Authorization: "Bearer "+sessionStorage["token"]
        //            }
        //        };
        //        $http(request)
        //            .then(function (response) {
        //                deferred.resolve(response.data)
        //            }, function (err) {
        //                deferred.reject(err)
        //            });
        //        return deferred.promise;
        //    }

            return {
                isLoggedUser : isLoggedUser,
                getLoggedUser : getLoggedUser,
                setLoggedUser : setLoggedUser
            }
        }
    ]);
