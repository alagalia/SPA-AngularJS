'use strict';

trackerApp
    .factory('projectsService',[
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){
            //todo AJAX to REST


            function getAllProjects(){
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'projects',
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


            function getMyProjects(){
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'projects',
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


            function getProjectById(id){
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'Projects/'+ id,
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
                getAllProjects : getAllProjects,
                getProjectById : getProjectById,
                getIssuesByProjectId: getIssuesByProjectId
            }
        }
    ]);
