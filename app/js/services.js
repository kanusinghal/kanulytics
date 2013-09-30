'use strict';

/* Services */

angular.module('csvService',[]).
    factory('DataSource', function($http, $q){
       var dataSet = [];
       var defer = $q.defer();
       $http.get(
           'data/world-pop.csv',
           {transformResponse: function(data) {
             console.log("transform data");
             var json = CSV2JSON(data);
             return json;
           }}).
           success(function(data) {
             console.log("Request succeeded");
             dataSet = data;
             defer.resolve(dataSet);
            }).
            error(function (data, status, headers, config) {
              console.log('HTTP error');
            });
         return {
           get: function() {
             return defer.promise;
           },
         }
     });
