'use strict';


angular.module('NotePairApp')
    .factory('httpq', function($http, $q){
    return {
        get: function() {
            var deferred = $q.defer();
            $http.get.apply(null, arguments)
                .success(deferred.resolve)
                .error(deferred.reject);
            return deferred.promise;
        }
    }
});