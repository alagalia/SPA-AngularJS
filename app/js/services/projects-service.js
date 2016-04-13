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


            //todo get my projects
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

            function addProject(project){
                var deferred = $q.defer();

                var request = {
                    method: 'POST',
                    url: BASE_URL + 'projects',
                    data : {
                        'Name' : project.Name,
                        'Description' : project.Description,
                        'ProjectKey' : project.ProjectKey,
                        'labels' : project.labels,
                        'priorities' : [{'Name': 'Low'}],
                        'LeadId' : project.LeadId
                    },
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

            function getAllExistingLabels(){
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'labels/?filter',
                    headers: {
                        Authorization: "Bearer "+sessionStorage["token"]
                    }
                };
                $http(request)
                    .then(function(response){
                        deferred.resolve(response.data);
                    },function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }


            return {
                getAllProjects : getAllProjects,
                getProjectById : getProjectById,
                addProject : addProject,
                getAllExistingLabels : getAllExistingLabels
            }
        }
    ]);
